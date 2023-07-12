from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel
from typing import List, Union, Optional
from queries.user_queries import (
    UserQueries,
    UserIn,
    UserOut,
    UsersOutWithPassword,
)


router = APIRouter()


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


class Error(BaseModel):
    message: str


@router.get("/token", response_model=Union[UserToken, None])
async def get_token(
    request: Request,
    user: dict = Depends(authenticator.try_get_current_account_data),
):
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.post("/api/users/", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = queries.create(info, hashed_password)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )
    form = UserForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, queries)
    return UserToken(account=account, **token.dict())


@router.get("/api/users/", response_model=Union[Error, List[UserOut]])
def get_all(
    repo: UserQueries = Depends(),
):
    return repo.get_all()


@router.get("/api/users/{user_id}", response_model=Optional[UserOut])
def get_one(
    user_id: int,
    response: Response,
    user: dict = Depends(authenticator.try_get_current_account_data),
    repo: UserQueries = Depends(),
) -> UserOut:
    user = repo.get_one(user_id)
    if user is None:
        response.status_code = 404
    return user


@router.put("/api/users/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user_in: UserIn,
    response: Response,
    queries: UserQueries = Depends(),
):
    record = queries.update_user(user_id, user_in)
    if record is None:
        response.status_code = 404
    else:
        return record

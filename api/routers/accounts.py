from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from typing import List, Union, Optional
from queries.accounts import (
    AccountRepo,
    AccountIn,
    AccountOut,
    DuplicateAccountError,
)


router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


class AccountsOut(BaseModel):
    users: list[AccountOut]


class Error(BaseModel):
    message: str


@router.post("/users", response_model=AccountOut | HttpError)
async def create_user(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create_user(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/users", response_model=Union[Error, List[AccountOut]])
def get_all(
    repo: AccountRepo = Depends(),
):
    return repo.get_all()


@router.get("/users/{user_id}", response_model=Optional[AccountOut])
def get_one(
    user_id: int,
    response: Response,
    repo: AccountRepo = Depends(),
) -> AccountOut:
    user = repo.get_one(user_id)
    if user is None:
        response.status_code = 404
    return user


@router.put("/users/{user_id}", response_model=AccountOut)
def update_user(
    user_id: int,
    user_in: AccountIn,
    response: Response,
    queries: AccountRepo = Depends(),
):
    record = queries.update_user(user_id, user_in)
    if record is None:
        response.status_code = 404
    else:
        return record
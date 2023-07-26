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


# class AccountOut(BaseModel):
#     users: list[AccountOut]


class Error(BaseModel):
    message: str


@router.get("/api/protected", response_model=bool)
async def get_token(
    request: Request,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
):
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/users", response_model=AccountToken | HttpError)
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


@router.get("/users/{username}", response_model=Optional[AccountOut])
def get_one(
    username: str,
    response: Response,
    repo: AccountRepo = Depends(),
) -> AccountOut:
    user = repo.get_one(username)
    if user is None:
        response.status_code = 404
    return user


@router.put("/users/{account_id}", response_model=AccountOut)
def update(
    account_id: int,
    info: AccountIn,
    response: Response,
    queries: AccountRepo = Depends(),
):
    record = queries.update_account(account_id, info)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/users/{account_id}", response_model=bool)
def delete_job(
    account_id: int,
    repo: AccountRepo = Depends(),
) -> bool:
    return repo.delete(account_id)

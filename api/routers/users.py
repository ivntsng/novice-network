from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from typing import List, Union, Optional
from queries.user_queries import UserQueries


router = APIRouter()


class UserIn(BaseModel):
    username: str
    password: str
    email: str
    type: str


class UserOut(BaseModel):
    id: int
    username: str
    password: str
    email: str
    type: str


class UsersOut(BaseModel):
    users: list[UserOut]


class Error(BaseModel):
    message: str


@router.post("/api/users/", response_model=UserOut)
def create_user(user_in: UserIn, queries: UserQueries = Depends()):
    return queries.create_user(user_in)


@router.get("/api/users/", response_model=Union[Error, List[UserOut]])
def get_all(
    repo: UserQueries = Depends(),
):
    return repo.get_all()


@router.get("/api/users/{user_id}", response_model=Optional[UserOut])
def get_one(
    user_id: int,
    response: Response,
    repo: UserQueries = Depends(),
) -> UserOut:
    user = repo.get_one(user_id)
    if user is None:
        response.status_code = 404
    return user

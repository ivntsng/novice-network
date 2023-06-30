from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
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


@router.post("/api/users/", response_model=UserOut)
def create_user(user_in: UserIn, queries: UserQueries = Depends()):
    return queries.create_user(user_in)

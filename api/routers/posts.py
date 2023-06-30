from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.posts import (
    PostIn,
    PostRepository,
    PostOut,
    Error
    )

router = APIRouter()

@router.post("/posts", response_model=Union[PostOut, Error])
def create_post(
    post: PostIn,
    response: Response,
    repo: PostRepository = Depends()
):
    response.status_code = 400
    return repo.create(post)

@router.get("/posts", response_model=Union[List[PostOut], Error])
def get_all(
    repo: PostRepository = Depends(),
):
    return repo.get_all()

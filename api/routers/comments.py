from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.comments import (CommentIn, CommentOut, CommentRepository, Error)

router = APIRouter()

@router.post("/posts/{post_id}/comments", response_model=Union[CommentOut, Error])
def create_comment(
    comment: CommentIn,
    response: Response,
    repo: CommentRepository = Depends(),
):
    return repo.create(comment)

@router.get("/posts/{post_id}/comments", response_model=Union[List[CommentOut], Error])
def get_all(
    repo: CommentRepository = Depends(),
):
    return repo.get_all()

@router.put("/posts/{post_id}/comments/{comment_id}", response_model=Union[CommentOut, Error])
def update_comment(
    comment_id: int,
    comment: CommentIn,
    repo: CommentRepository = Depends(),
) -> Union[Error, CommentOut]:
    return repo.update(comment_id, comment)

@router.delete("/posts/{post_id}/comments/{comment_id}", response_model=bool)
def delete_comment(
    comment_id: int,
    repo: CommentRepository = Depends(),
) -> bool:
    return repo.delete(comment_id)

@router.get("/posts/{post_id}/comments/{comment_id}", response_model=Optional[CommentOut])
def get_one_comment(
    comment_id: int,
    response: Response,
    repo: CommentRepository = Depends(),
) -> CommentOut:
    comment = repo.get_one(comment_id)
    if comment is None:
        response.status_code = 404
    return comment

from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.comments import (CommentIn, CommentOut, CommentRepository, Error, Status)

router = APIRouter()

@router.post("/posts/{post_id}/comments", response_model=Union[CommentOut, Error])
def create_comment(
    comment: CommentIn,
    response: Response,
    repo: CommentRepository = Depends(),
):
    response.status_code = 400
    return repo.create(comment)

'''
@router.get("/posts/{post_id}/comments", response_model=List[CommentOut])
def get_all(
    repo: CommentRepository = Depends(),
):
    return repo.get_all()

@router.put("/posts/{post_id}/comments", response_model=Union[CommentOut, Error])
def update_comment(
    comment_id: id,
    comment: CommentIn,
    repo: CommentRepository = Depends(),
) -> Union[Error, CommentOut]:
    return repo.update(comment_id, comment)
'''

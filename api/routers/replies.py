from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.replies import (ReplyIn, ReplyOut, ReplyRepository, Error)

router = APIRouter()

@router.post("/posts/{post_id}/comments/{comment_id}/replies", response_model=Union[ReplyOut, Error])
def create_reply(
    reply: ReplyIn,
    response: Response,
    repo: ReplyRepository = Depends(),
):
    return repo.create(reply)

@router.get("/posts/{post_id}/comments/{comment_id}/replies", response_model=Union[List[ReplyOut], Error])
def get_all_replies(
    comment_id: int,
    repo: ReplyRepository = Depends(),
):
    return repo.get_all(comment_id)

@router.put("/posts/{post_id}/comments/{comment_id}/replies/{reply_id}", response_model=Union[ReplyOut, Error])
def update_reply(
    reply_id: int,
    reply: ReplyIn,
    repo: ReplyRepository = Depends(),
) -> Union[Error, ReplyOut]:
    return repo.update(reply_id, reply)

@router.delete("/posts/{post_id}/comments/{comment_id}/replies/{reply_id}", response_model=bool)
def delete_reply(
    reply_id: int,
    repo: ReplyRepository = Depends(),
) -> bool:
    return repo.delete(reply_id)

@router.get("/posts/{post_id}/comments/{comment_id}/replies/{reply_id}", response_model=Optional[ReplyOut])
def get_one_reply(
    reply_id: int,
    response: Response,
    repo: ReplyRepository = Depends(),
) -> ReplyOut:
    reply = repo.get_one(reply_id)
    if reply is None:
        response.status_code = 404
    return reply

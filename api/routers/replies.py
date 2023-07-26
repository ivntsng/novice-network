from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.replies import (ReplyIn, ReplyOut, ReplyRepository, Error)

router = APIRouter()

@router.post("/posts/{post_id}/comments/{comment_id}/replies", response_model=Union[ReplyOut, Error])
def create_reply(
    reply: ReplyIn,
    post_id: int,
    comment_id: int,
    repo: ReplyRepository = Depends(),
):
    return repo.create(post_id, comment_id, reply)

@router.get("/posts/{post_id}/comments/{comment_id}/replies", response_model=Union[List[ReplyOut], Error])
def get_all_replies(
    post_id: int,
    comment_id: int,
    repo: ReplyRepository = Depends(),
):
    return repo.get_all(post_id, comment_id)

@router.put("/posts/{post_id}/comments/{comment_id}/replies/{reply_id}", response_model=Union[ReplyOut, Error])
def update_reply(
    reply_id: int,
    post_id: int,
    comment_id: int,
    reply: ReplyIn,
    repo: ReplyRepository = Depends(),
) -> Union[Error, ReplyOut]:
    return repo.update(post_id, comment_id, reply_id, reply)

@router.delete("/posts/{post_id}/comments/{comment_id}/replies/{reply_id}", response_model=bool)
def delete_reply(
    reply_id: int,
    post_id: int,
    comment_id: int,
    repo: ReplyRepository = Depends(),
) -> bool:
    return repo.delete(post_id, comment_id, reply_id)

@router.get("/posts/{post_id}/comments/{comment_id}/replies/{reply_id}", response_model=Optional[ReplyOut])
def get_one_reply(
    reply_id: int,
    post_id: int,
    comment_id: int,
    response: Response,
    repo: ReplyRepository = Depends(),
) -> ReplyOut:
    reply = repo.get_one(post_id, comment_id, reply_id)
    if reply is None:
        response.status_code = 404
    return reply

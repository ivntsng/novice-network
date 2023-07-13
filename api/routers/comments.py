from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.comments import (CommentIn, CommentOut, CommentRepository, Error, Status)

router = APIRouter()

@router.post("/posts/{post_id}/comments")
def create_comment(comment: CommentIn):
    print('comment', comment)
    return comment

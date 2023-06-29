from fastapi import APIRouter
from queries.posts import PostIn

router = APIRouter()

@router.post("/posts")
def create_post(post: PostIn):
    return post

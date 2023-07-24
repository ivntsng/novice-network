from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import jobs
import os
from routers import posts
from routers import comments
from routers import accounts
from routers import replies
from authenticator import authenticator

app = FastAPI()

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST" "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(jobs.router)
app.include_router(comments.router)
app.include_router(replies.router)
app.include_router(posts.router)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}

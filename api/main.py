from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import jobs
import os
from routers import users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router)
app.include_router(jobs.router)

from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class UserIn(BaseModel):
    username: str
    password: str
    email: str
    type: str

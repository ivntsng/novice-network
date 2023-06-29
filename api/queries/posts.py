from datetime import datetime
from pydantic import BaseModel

class PostIn(BaseModel):
    title: str
    created_datetime: datetime
    description: str
    owner_id: int

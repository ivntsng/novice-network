from datetime import datetime
from pydantic import BaseModel
import psycopg
from queries.pool import pool

class PostIn(BaseModel):
    title: str
    created_datetime: datetime
    description: str

class PostOut(BaseModel):
    id: int
    title: str
    created_datetime: datetime
    description: str

class PostRepository:
    def create(post: PostIn):
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO posts
                        (tile, created_datetime, description)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        post.title,
                        post.created_datetime,
                        post.description
                    ]
                )
                # Return new data
                id = result.fetchone()[0]
                old_data = post.dict()
                return PostOut(id=id, **old_data)

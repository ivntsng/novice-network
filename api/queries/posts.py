from datetime import datetime
from pydantic import BaseModel
from typing import List, Union
import psycopg
from queries.pool import pool

class Error(BaseModel):
    message: str

class PostIn(BaseModel):
    title: str
    created_datetime: datetime
    description: str
    owner_id: int

class PostOut(BaseModel):
    id: int
    title: str
    created_datetime: datetime
    description: str
    owner_id: int

class PostRepository:
    def get_all(self) -> Union[Error, List[PostOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, title, created_datetime, description, owner_id
                        FROM posts
                        ORDER BY id
                        """
                    )
                    return [
                        PostOut(
                            id=record[0],
                            title=record[1],
                            created_datetime=record[2],
                            description=record[3],
                            owner_id=record[4],
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
            return {"message": "Couldn't get posts"}

    def create(self, post: PostIn) -> PostOut:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO posts
                        (title, created_datetime, description, owner_id)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        post.title,
                        post.created_datetime,
                        post.description,
                        post.owner_id
                    ]
                )
                # Return new data
                id = result.fetchone()[0]
                old_data = post.dict()
                return PostOut(id=id, **old_data)

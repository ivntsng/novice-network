from datetime import datetime
from pydantic import BaseModel
from typing import List, Union, Optional
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
    def delete(self, post_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM posts
                        WHERE id = %s
                        """,
                        [post_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Couldn't delete the post"}

    def update(self, post_id: int, post: PostIn) -> Union[PostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE posts
                        SET title = %s
                        , created_datetime = %s
                        , description = %s
                        , owner_id = %s
                        WHERE id = %s
                        """,
                        [
                            post.title,
                            post.created_datetime,
                            post.description,
                            post.owner_id,
                            post_id
                        ]
                    )
                    return self.post_in_to_out(post_id, post)
        except Exception as e:
            print(e)
            return {"message": "Couldn't update the post"}

    def post_in_to_out(self, id: int, post: PostIn):
        old_data = post.dict()
        return PostOut(id=id, **old_data)

    def record_to_post_out(self, record):
        return PostOut(
                            id=record[0],
                            title=record[1],
                            created_datetime=record[2],
                            description=record[3],
                            owner_id=record[4],
                        )

    def get_all(self) -> Union[Error, List[PostOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title, created_datetime, description, owner_id
                        FROM posts
                        ORDER BY id
                        """
                    )
                    return [
                        self.record_to_post_out(record)
                        for record in result
                    ]

        except Exception as e:
            print(e)
            return {"message": "Couldn't get posts"}

    def get_one(self, post_id: int) -> Optional[PostOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , title
                            , created_datetime
                            , description
                            , owner_id
                        FROM posts
                        WHERE id = %s
                        """,
                        [post_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_post_out(record)
        except Exception as e:
            print(e)
            return {"message": "Couldn't get the post"}

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
                return self.post_in_to_out(id, post)

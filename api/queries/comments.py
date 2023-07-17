from pydantic import BaseModel
from typing import Optional, Union, List
from datetime import datetime
from queries.pool import pool

class CommentIn(BaseModel):
    user_id: int
    post_id: int
    comment: str
    created_on: datetime

class CommentOut(BaseModel):
    comment_id: int
    user_id: int
    post_id: int
    comment: str
    created_on: datetime

class Error(BaseModel):
    message: str

class CommentRepository:
    def get_one(self, comment_id: int) -> Optional[CommentOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT comment_id
                                , user_id
                                , post_id
                                , comment
                                , created_on
                        FROM comments
                        WHERE comment_id = %s
                        """,
                        [
                            comment_id,
                        ]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_comment_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that comment"}

    def delete(self, comment_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM comments
                        WHERE comment_id = %s
                        """,
                        [comment_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, comment_id: int, comment: CommentIn) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE comments
                        SET user_id = %s
                           , comment = %s
                           , created_on = %s
                        WHERE comment_id = %s
                        """,
                        [
                            comment.user_id,
                            comment.comment,
                            comment.created_on,
                            comment_id,
                        ]
                    )
                    return self.comment_in_to_out(comment_id, comment)
        except Exception as e:
            print(e)
            return {"message": "Could not update that comment"}

    def get_all(self) -> Union[Error, List[CommentOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT comment_id, user_id, post_id, comment, created_on
                        FROM comments
                        ORDER BY created_on;
                        """
                    )
                    result = db.fetchall()
                    print(result)
                    return [
                        CommentOut(
                            comment_id=record[0],
                            user_id=record[1],
                            post_id=record[2],
                            comment=record[3],
                            created_on=record[4],
                        )
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all comments"}

    def create(self, comment: CommentIn) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result=db.execute(
                        """
                        INSERT INTO comments
                        (user_id, post_id, comment, created_on)
                        VALUES
                            (%s, %s, %s, CURRENT_TIMESTAMP)
                        RETURNING comment_id;
                        """,
                        [
                            comment.user_id,
                            comment.post_id,
                            comment.comment,
                        ],
                    )
                    comment_id = result.fetchone()[0]
                    return self.comment_in_to_out(comment_id, comment)
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def comment_in_to_out(self, id: int, comment: CommentIn):
        old_data = comment.dict()
        return CommentOut(comment_id=id, **old_data)

    def record_to_comment_out(self, record):
        return CommentOut(
            comment_id=record[0],
            user_id=record[1],
            post_id=record[2],
            comment=record[3],
            created_on=record[4],
        )

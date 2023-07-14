from pydantic import BaseModel
from typing import Optional, Union, List
from datetime import datetime
from queries.pool import pool

class CommentIn(BaseModel):
    user_id: int
    post_id: int
    comment: str

class CommentOut(BaseModel):
    comment_id: int
    post_id: int
    user_id: int
    comment: str
    created_on: datetime

class Error(BaseModel):
    message: str

class Status(BaseModel):
    status: str

class CommentRepository:
    def create(self, comment: CommentIn) -> CommentOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO comments
                      (user_id, post_id, comment, created_on)
                    VALUES
                      (%s, %s, %s, CURRENT_TIMESTAMP)
                    RETURNING comment_id
                    """,
                    [
                        comment.user_id,
                        comment.post_id,
                        comment.comment
                    ],
                )
                comment_id = result.fetchone()[0]
                old_data = comment.dict()
                return {"message": "error!"}
                return CommentOut(comment_id=comment_id, **old_data)




'''
    def get_comment(self, comment_id: int) -> Union[CommentOut, dict]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, post_id, user_id, comment, created_on
                        FROM comment
                        WHERE id = %s
                        """,
                        [comment_id],
                    )
                    record = db.fetchone()
                    if record is None:
                        raise HTTPException(
                            status_code=404,
                            detail=f"Comment ID {comment_id} does not exist.",
                        )
                    return CommentOut(comment_id=record[0], created_on=record[4], **comment_in.dict())
        except HTTPException as e:
            raise e

    def delete_comment(self, comment_id: int) -> None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM comment
                        WHERE id = %s
                        """,
                        [comment_id],
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404,
                            detail=f"Comment ID {comment_id} does not exist.",
                        )
        except HTTPException as e:
            raise e

    def update(self, comment_id: int, comment: CommentIn) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE comments
                        SET comment_id = %s,
                            user_id = %s,
                            comment = %s
                        Where id = %s
                        """,
                        [
                            comment.user_id,
                            comment.post_id,
                            comment.comment,
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
                    result = db.execute(
                        """
                        SELECT user_id, comment_id, post_id, comment, created_on
                        FROM comments
                        ORDER BY created_on;
                        """
                    )
                    return [
                        self.record_to_comment_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all comments"}
'''

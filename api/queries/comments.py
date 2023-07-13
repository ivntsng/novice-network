from pydantic import BaseModel
from typing import Optional
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
    detail: Optional[str] = None

class Status(BaseModel):
    status: str

class CommentRepository:
    def create_comment(self, comment_in: CommentIn) -> CommentOut:
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
                        comment_in.user_id,
                        comment_in.post_id,
                        comment_in.comment
                    ],
                )
                comment_id = result.fetchone()[0]
                return CommentOut(comment_id=comment_id, created_on=datetime.now(), **comment_in.dict())
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

    def update_comment(self, comment_id: int, comment: CommentIn) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE comment
                        SET user_id = %s,
                            post_id = %s,
                            comment = %s
                        WHERE id = %s
                        """,
                        [
                            comment.user_id,
                            comment.post_id,
                            comment.comment,
                            comment_id,
                        ],
                    )
                    return CommentOut(comment_id=comment_id, created_on=datetime.now(), **comment.dict())
        except Exception:
            return {"message": f"Could not update comment ID: {comment_id}"}

    def get_all_comments(self, post_id: int) -> List[CommentOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, post_id, user_id, comment, created_on
                        FROM comment
                        WHERE post_id = %s
                        ORDER BY created_on
                        """,
                        [post_id],
                    )
                    return [
                        CommentOut(
                            comment_id=comment_records[0],
                            post_id=comment_records[1],
                            user_id=comment_records[2],
                            comment=comment_records[3],
                            created_on=comment_records[4],
                        )
                        for comment_records in db
                    ]
        except Exception:
            return {"message": f"Could not retrieve comments for Post ID: {post_id}"}
'''

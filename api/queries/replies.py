from pydantic import BaseModel, Field
from typing import Optional, Union, List
from datetime import datetime
from queries.pool import pool


class ReplyIn(BaseModel):
    owner_username: str
    comment_id: int
    reply: str
    created_on: datetime = Field(default_factory=datetime.now)


class ReplyOut(BaseModel):
    reply_id: int
    owner_username: str
    comment_id: int
    reply: str
    created_on: datetime


class Error(BaseModel):
    message: str


class ReplyRepository:
    def get_one(self, post_id: int, comment_id: int, reply_id: int) -> Optional[ReplyOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT reply_id
                                , owner_username
                                , comment_id
                                , reply
                                , created_on
                        FROM replies
                        WHERE post_id = %s AND comment_id = %s AND reply_id = %s
                        """,
                        [
                            post_id,
                            comment_id,
                            reply_id,
                        ],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_reply_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that reply"}

    def delete(self, post_id: int, comment_id: int, reply_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM replies
                        WHERE post_id = %s AND comment_id = %s AND reply_id = %s
                        """,
                        [post_id, comment_id, reply_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, post_id: int, comment_id: int, reply_id: int, reply: ReplyIn) -> Union[ReplyOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE replies
                        SET owner_username = %s
                           , reply = %s
                           , created_on = %s
                        WHERE post_id = %s AND comment_id = %s AND reply_id = %s
                        """,
                        [
                            reply.owner_username,
                            reply.reply,
                            reply.created_on,
                            post_id,
                            comment_id,
                            reply_id,
                        ],
                    )
                    return self.reply_in_to_out(reply_id, reply)
        except Exception as e:
            print(e)
            return {"message": "Could not update that reply"}

    def get_all(self, post_id: int, comment_id: int) -> Union[Error, List[ReplyOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT reply_id, owner_username, comment_id, reply, created_on
                        FROM replies
                        WHERE post_id = %s AND comment_id = %s
                        ORDER BY created_on;
                        """,
                        [post_id, comment_id]
                    )
                    result = db.fetchall()
                    return [
                        ReplyOut(
                            reply_id=record[0],
                            owner_username=record[1],
                            comment_id=record[2],
                            reply=record[3],
                            created_on=record[4],
                        )
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all replies"}

    def create(self, post_id: int, comment_id: int, reply: ReplyIn) -> Union[ReplyOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO replies
                        (post_id, owner_username, comment_id, reply, created_on)
                        VALUES
                            (%s, %s, %s, %s, CURRENT_TIMESTAMP)
                        RETURNING reply_id;
                        """,
                        [
                            post_id,
                            reply.owner_username,
                            comment_id,
                            reply.reply,
                        ],
                    )
                    reply_id = result.fetchone()[0]
                    return self.reply_in_to_out(reply_id, reply)
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def reply_in_to_out(self, reply_id: int, reply: ReplyIn) -> ReplyOut:
        return ReplyOut(
            reply_id=reply_id,
            owner_username=reply.owner_username,
            comment_id=reply.comment_id,
            reply=reply.reply,
            created_on=reply.created_on,
        )

    def record_to_reply_out(self, record):
        return ReplyOut(
            reply_id=record[0],
            owner_username=record[1],
            comment_id=record[2],
            reply=record[3],
            created_on=record[4],
        )

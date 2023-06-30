import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from typing import Union, List, Optional


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class UserOut(BaseModel):
    id: int
    username: str
    password: str
    email: str
    type: str


class Error(BaseModel):
    message: str


class UserQueries:
    def create_user(self, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.username,
                    data.password,
                    data.email,
                    data.type,
                ]
                cur.execute(
                    """
                    INSERT INTO users (username, password, email, type)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, username, password, email, type
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def get_all(self) -> Union[Error, List[UserOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT id
                            , username
                            , password
                            , email
                            , type
                            FROM users
                            ORDER BY id;
                            """
                    )
                    result = []
                    for record in db:
                        print(record)
                        user = UserOut(
                            id=record[0],
                            username=record[1],
                            password=record[2],
                            email=record[3],
                            type=record[4],
                        )
                        result.append(user)
                    return result

        except Exception:
            return {"message": "Could not get users"}

    def get_one(self, user_id: int) -> Optional[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT id
                            , username
                            , password
                            , email
                            , type
                            FROM users
                            WHERE id = %s;
                            """,
                        [user_id],
                    )
                    record = result.fetchone()
                    return self.record_to_user_out(record)

        except Exception:
            return {"message": "Could not get users"}

    def record_to_user_out(self, record):
        return UserOut(
            id=record[0],
            username=record[1],
            password=record[2],
            email=record[3],
            type=record[4],
        )

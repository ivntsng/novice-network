import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from typing import Union, List, Optional


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class UserIn(BaseModel):
    username: str
    password: str
    email: str


class UserOut(BaseModel):
    id: int
    username: str
    password: str
    email: str
    is_mentor: Optional[bool]
    is_recruiter: Optional[bool]


class UsersOutWithPassword(UserOut):
    hashed_password: str


class Error(BaseModel):
    message: str


class UserQueries:
    def create_user(
        self, users: UserIn, hashed_password: str
    ) -> UsersOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO users
                            (username,
                            email,
                            hashed_password)
                        VALUES
                            (%s,%s,%s)
                        RETURNING user_id;
                        """,
                        [users.email, users.username, hashed_password],
                    )
                    user_id = result.fetchone()[0]
                    old_data = users.dict()
                    return UsersOutWithPassword(
                        user_id=user_id,
                        **old_data,
                        hashed_password=hashed_password
                    )
        except Exception as e:
            print(e)
            return Error(message=str(e))

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

    def get_one(self, user_id: int) -> UsersOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT id
                            , username
                            , hashed_password
                            , email
                            , is_mentor,
                            is_recruiter
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
            hashed_password=record[2],
            email=record[3],
            is_mentor=record[4],
            is_recruiter=record[5],
        )

    def update_user(self, user_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.username,
                    data.password,
                    data.email,
                    data.type,
                    user_id,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET username = %s
                      , password = %s
                      , email = %s
                      , type = %s
                    WHERE id = %s
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

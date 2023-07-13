import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from typing import Union, List, Optional
from queries.pool import pool


class AccountIn(BaseModel):
    username: str
    email: str
    password: str
    role: str


class AccountOut(BaseModel):
    user_id: int
    username: str
    email: str
    role: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class AccountRepo:
    def record_to_user_out(self, record) -> AccountOut:
        account_dict = {
            "user_id": record[0],
            "name": record[1],
            "email": record[2],
            "hashed_password": record[3],
            "role": record[4],
        }

        return account_dict

    def create_user(
        self, user: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                            INSERT INTO users (username, hashed_password, email, role)
                            VALUES (%s, %s, %s, %s)
                            RETURNING user_id, username, hashed_password, email, role
                            """,
                        [
                            user.username,
                            hashed_password,
                            user.email,
                            user.role,
                        ],
                    )
                    print("User Created?")
                    user_id = cur.fetchone()[0]
                    print("Created ID", user_id)

                    return AccountOutWithPassword(
                        user_id=user_id,
                        username=user.username,
                        email=user.email,
                        hashed_password=hashed_password,
                        role=user.role,
                    )
        except Exception as e:
            print(f"error: ", {e})
            return {"message": "Could not create an account"}

    def get_all(self) -> Union[Error, List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT id
                            , username
                            , hashed_password
                            , email
                            , role
                            FROM users
                            ORDER BY user_id;
                            """
                    )
                    result = []
                    for record in db:
                        print(record)
                        user = AccountOut(
                            user_id=record[0],
                            username=record[1],
                            hashed_password=record[2],
                            email=record[3],
                            role=record[4],
                        )
                        result.append(user)
                    return result

        except Exception:
            return {"message": "Could not get accounts"}

    def get_one(self, username: str) -> Optional[AccountOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT user_id
                            , username
                            , hashed_password
                            , email
                            , role
                            FROM users
                            WHERE id = %s;
                            """,
                        [username],
                    )
                    record = result.fetchone()
                    return self.record_to_user_out(record)

        except Exception:
            return {"message": "Could not get users"}

    def update_user(self, user_id, data, hashed_password):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.username,
                    hashed_password,
                    data.email,
                    data.role,
                    user_id,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET username = %s
                      , hashed_password = %s
                      , email = %s
                      , role = %s
                    WHERE user_id = %s
                    RETURNING user_id, username, password, email, type
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

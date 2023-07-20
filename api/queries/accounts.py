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
    id: int
    username: str
    hashed_password: str
    email: str
    role: str


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class AccountRepo:
    def record_to_user_out(self, record):
        return AccountOut(
            id=record[0],
            username=record[1],
            hashed_password=record[2],
            email=record[3],
            role=record[4],
        )

    def record_to_all_user_out(self, records):
        accounts = []
        for record in records:
            accounts.append(
                AccountOut(
                    id=record[0],
                    username=record[1],
                    hashed_password=record[2],
                    email=record[3],
                    role=record[4],
                )
            )
        print(accounts)
        return accounts

    def create_user(self, user: AccountIn, hashed_password: str) -> AccountOut:
        try:
            print("Username", user)
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                            INSERT INTO accounts (username, hashed_password, email, role)
                            VALUES (%s, %s, %s, %s)
                            RETURNING id, username, hashed_password, email, role
                            """,
                        [
                            user.username,
                            hashed_password,
                            user.email,
                            user.role,
                        ],
                    )
                    print("User Created?")
                    id = result.fetchone()[0]
                    print("Created ID", id)
                    print("result", result)

                    return AccountOut(
                        id=id,
                        username=user.username,
                        hashed_password=hashed_password,
                        email=user.email,
                        role=user.role,
                    )
        except Exception as e:
            return {"error": e}

    def get_one(self, username: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE username = %s
                    """,
                    [username],
                )

                record = cur.fetchone()
                print("account row:", record)
                return self.record_to_user_out(record)

    def get_all(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                            SELECT *
                                FROM accounts
                            """
                )
                record = cur.fetchall()
                print("account row:", record)
                return self.record_to_all_user_out(record)

    # def get_all(self) -> Union[Error, List[AccountOut]]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                         SELECT id
    #                         , username
    #                         , hashed_password
    #                         , email
    #                         , role
    #                         FROM users
    #                         ORDER BY id;
    #                         """
    #                 )
    #                 result = []
    #                 for record in db:
    #                     print(record)
    #                     user = AccountOut(
    #                         id=record[0],
    #                         username=record[1],
    #                         hashed_password=record[2],
    #                         email=record[3],
    #                         role=record[4],
    #                     )
    #                     result.append(user)
    #                 return result

    #     except Exception:
    #         return {"message": "Could not get accounts"}

    # def get_one(self, username: str) -> AccountOut:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                         SELECT id
    #                         , username
    #                         , hashed_password
    #                         , email
    #                         , role
    #                         FROM users
    #                         WHERE username = %s;
    #                         """,
    #                     [username],
    #                 )
    #                 record = result.fetchone()
    #                 return self.record_to_user_out(record)

    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not get users"}

    # def update_user(self, user_id, data, hashed_password):
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             params = [
    #                 data.username,
    #                 hashed_password,
    #                 data.email,
    #                 data.role,
    #                 user_id,
    #             ]
    #             cur.execute(
    #                 """
    #                 UPDATE users
    #                 SET username = %s
    #                   , hashed_password = %s
    #                   , email = %s
    #                   , role = %s
    #                 WHERE user_id = %s
    #                 RETURNING user_id, username, password, email, type
    #                 """,
    #                 params,
    #             )

    #             record = None
    #             row = cur.fetchone()
    #             if row is not None:
    #                 record = {}
    #                 for i, column in enumerate(cur.description):
    #                     record[column.name] = row[i]

    #             return record

    def update_account(self, username, account_update):
        with pool.connection() as conn:
            with conn.cursor() as db:
                returned_values = None

                if account_update.username:
                    print("printing username")
                    result = db.execute(
                        """
                            UPDATE accounts
                            SET username = %s
                            WHERE username = %s
                            RETURNING *
                        """,
                        [account_update.username, username],
                    )

                if account_update.email:
                    print("printing email")
                    result = db.execute(
                        """
                            UPDATE accounts
                            SET email = %s
                            WHERE username = %s
                            RETURNING *
                        """,
                        [account_update.email, username],
                    )

                returned_values = result.fetchone()
                print("updates: ", returned_values)
                return self.record_to_account(returned_values)

    def record_to_account(self, record):
        if record is None:
            return None

        return AccountOut(
            id=record[0],
            username=record[1],
            hashed_password=record[2],
            email=record[3],
            role=record[4],
        )

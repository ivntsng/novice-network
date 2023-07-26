import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from typing import Union, List, Optional
from queries.pool import pool
from fastapi import HTTPException


class AccountIn(BaseModel):
    username: str
    email: str
    password: str
    role: str
    bootcamp: str
    picture: str


class AccountOut(BaseModel):
    id: int
    username: str
    hashed_password: str
    email: str
    role: str
    bootcamp: str
    picture: str


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
            bootcamp=record[5],
            picture=record[6],
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
                    bootcamp=record[5],
                    picture=record[6],
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
                            INSERT INTO accounts (username, hashed_password, email, role, bootcamp, picture)
                            VALUES (%s, %s, %s, %s, %s, %s)
                            RETURNING id, username, hashed_password, email, role, bootcamp, picture
                            """,
                        [
                            user.username,
                            hashed_password,
                            user.email,
                            user.role,
                            user.bootcamp,
                            user.picture,
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
                        bootcamp=user.bootcamp,
                        picture=user.picture,
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

    def update_account(self, account_id, account_update):
        with pool.connection() as conn:
            with conn.cursor() as db:
                returned_values = None

                if account_update.username:
                    print("printing username")
                    result = db.execute(
                        """
                            UPDATE accounts
                            SET username = %s
                            WHERE id = %s
                            RETURNING *
                        """,
                        [account_update.username, account_id],
                    )

                # if account_update.hashed_password:
                #     print("printing password")
                #     result = db.execute(
                #         """
                #             UPDATE accounts
                #             SET hashed_password = %s
                #             WHERE id = %s
                #             RETURNING *
                #         """,
                #         [account_update.hashed_password, account_id],
                #     )

                if account_update.email:
                    print("printing email")
                    result = db.execute(
                        """
                            UPDATE accounts
                            SET email = %s
                            WHERE id = %s
                            RETURNING *
                        """,
                        [account_update.email, account_id],
                    )

                if account_update.role:
                    print("printing role")
                    result = db.execute(
                        """
                            UPDATE accounts
                            SET role = %s
                            WHERE id = %s
                            RETURNING *
                        """,
                        [account_update.role, account_id],
                    )

                if account_update.bootcamp:
                    print("printing bootcamp")
                    result = db.execute(
                        """
                            UPDATE accounts
                            SET bootcamp = %s
                            WHERE id = %s
                            RETURNING *
                        """,
                        [account_update.bootcamp, account_id],
                    )

                if account_update.picture:
                    print("printing picture")
                    result = db.execute(
                        """
                            UPDATE accounts
                            SET picture = %s
                            WHERE id = %s
                            RETURNING *
                        """,
                        [account_update.picture, account_id],
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
            bootcamp=record[5],
            picture=record[6],
        )

    def delete(self, account_id: int) -> None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [account_id],
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404,
                            detail=f"Account ID {account_id} does not exist.",
                        )
            conn.commit()
            raise HTTPException(
                status_code=200,
                detail=f"Deleted account with ID: {account_id}.",
            )
        except HTTPException as error:
            raise error

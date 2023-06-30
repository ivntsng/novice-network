import os
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


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

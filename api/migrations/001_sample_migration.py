steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(1000) NOT NULL,
            password TEXT NOT NULL,
            email VARCHAR(1000) NOT NULL,
            created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            type VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE big_dummy (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE big_dummy;
        """,
    ],
]

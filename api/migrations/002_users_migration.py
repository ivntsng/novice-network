steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(1000) NOT NULL UNIQUE,
            hashed_password varchar(200) NOT NULL,
            email VARCHAR(1000) NOT NULL UNIQUE,
            created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            role VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
]

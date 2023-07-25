steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(1000) NOT NULL UNIQUE,
            hashed_password varchar(200) NOT NULL,
            email VARCHAR(1000) NOT NULL UNIQUE,
            role VARCHAR(1000) NOT NULL,
            bootcamp VARCHAR(1000),
            picture VARCHAR(3000)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
]

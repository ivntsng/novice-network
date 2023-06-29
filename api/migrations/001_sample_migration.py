steps = [
    [
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR (1000) NOT NULL,
            created_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            description TEXT NOT NULL
        );
        """,

        """
        DROP TABLE posts;
        """,
    ],
]

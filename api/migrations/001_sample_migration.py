steps = [
    [
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR (1000) NOT NULL,
            created_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            description TEXT NOT NULL,
            owner_id INTEGER NOT NULL
        );
        """,

        """
        DROP TABLE posts;
        """,
    ],
    [
        # Create job table
        """
        CREATE TABLE job (
            id SERIAL PRIMARY KEY NOT NULL,
            company_name VARCHAR(100) NOT NULL,
            job_title VARCHAR(100) NOT NULL,
            job_description TEXT NOT NULL,
            location VARCHAR(100) NOT NULL,
            department VARCHAR(100) NOT NULL,
            level VARCHAR(100) NOT NULL,
            created_on DATE DEFAULT CURRENT_DATE
        )
        """,
        """
        DROP TABLE job
        """,
    ],
]

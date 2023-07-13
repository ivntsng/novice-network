steps = [
    # [
    #     # "Up" SQL statement
    #     """
    #     CREATE TABLE users (
    #         user_id SERIAL PRIMARY KEY NOT NULL,
    #         username VARCHAR(1000) NOT NULL UNIQUE,
    #         hashed_password varchar(200) NOT NULL,
    #         email VARCHAR(1000) NOT NULL UNIQUE,
    #         created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    #         role VARCHAR(1000) NOT NULL
    #     );
    #     """,
    #     # "Down" SQL statement
    #     """
    #     DROP TABLE users;
    #     """,
    # ],
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
]

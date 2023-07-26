steps = [
    [
        # Create comments table
        """
        CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY NOT NULL,
            post_id INTEGER,
            owner_username VARCHAR(1000) NOT NULL,
            comment TEXT NOT NULL,
            created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        # Drop comments table
        """
        DROP TABLE comments;
        """,
    ],
    [
        # Create replies table
        """
        CREATE TABLE replies (
            reply_id SERIAL PRIMARY KEY NOT NULL,
            post_id INTEGER,
            comment_id INTEGER NOT NULL,
            owner_username VARCHAR(1000) NOT NULL,
            reply TEXT NOT NULL,
            created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        # Drop replies table
        """
        DROP TABLE replies;
        """,
    ],
]

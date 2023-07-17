steps = [
    [
        # Create comments table
        """
        CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY NOT NULL,
            post_id INTEGER,
            user_id VARCHAR(100) NOT NULL,
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
            comment_id INTEGER NOT NULL,
            user_id VARCHAR(100) NOT NULL,
            reply TEXT NOT NULL,
            created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (comment_id) REFERENCES comments (comment_id)
        );
        """,
        # Drop replies table
        """
        DROP TABLE replies;
        """,
    ],
]

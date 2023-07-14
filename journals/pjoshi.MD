# Add a comment

# Request Method: POST

# URL: http://localhost:xxxx/api/posts/{id:int}/comments

# Response:

```
{
    "status": "string",
    "create_comment": {
        "comment_id": "int",
        "post_id": "int",
        "user_id": "string",
        "comment": "string"
    }
}
```

# List all comments in a post

# Request Method: GET

# URL: http://localhost:xxxx/api/posts/{id:int}/comments

# Response:

```
{
    "status": "string",
    "list_comments": [
        {
            "comment_id": "int",
            "post_id": "int",
            "user_id": "string",
            "comment": "string"
        },
    ]
}

```

# Delete a comment

# Request Method: DELETE

# URL: http://localhost:xxxx/api/posts/{id:int}/comments/{id:int}

# Response:

```
{
    "status": "string"
}
```

# Edit a comment

# Request Method: PUT

# URL: http://localhost:xxxx/api/posts/{id:int}/comments/{id:int}

# Response:

```
{
    "status": "string",
    "edit_comment": {
        "comment_id": "int",
        "post_id": "int",
        "user_id": "string",
        "comment": "string"
    }
}
```

# Add a reply to a comment

# Request Method: POST

# URL: http://localhost:xxxx/api/posts/{id:int}/comments/{id:int}/replies

# Response:

```
{
    "status": "string",
    "create_reply": {
        "reply_id": "int",
        "comment_id": "int",
        "user_id": "string",
        "reply": "string"
    }
}
```

# List all replies to a comment

# Request Method: GET

# URL: http://localhost:xxxx/api/posts/{id:int}/comments/{id:int}/replies

# Response:

```
{
    "status": "string",
    "list_replies": [
        {
            "reply_id": "int",
            "comment_id": "int",
            "user_id": "string",
            "reply": "string"
        },

    ]
}
```

# Delete a reply to a comment

# Request Method: DELETE

# URL: http://localhost:xxxx/api/posts/{id:int}/comments/{id:int}/replies/{id:int}

# Response:

```
{
    "status": "string"
}
```

# Edit a reply to a comment

# Request Method: PUT

# URL: http://localhost:xxxx/api/posts/{id:int}/comments/{id:int}/replies/{id:int}

# Response:

```
{
    "status": "string",
    "edit_reply": {
        "reply_id": "int",
        "comment_id": "int",
        "user_id": "string",
        "reply": "string"
    }
}
```

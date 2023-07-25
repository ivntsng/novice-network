# APIs

## Users

- **Method**: `POST`, `GET`, `PUT`, `DELETE`
- **Path**: `/users`, `/users/{username}`

Input:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "bootcamp": "string",
  "picture": "string"
}
```

Output:

```json

Response body
Download
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MWJmNzc4ZC1hMjNkLTRlZTAtYjZmMC1iNzMxZTVmMjA4ZDkiLCJleHAiOjE2OTAzMTIxMDEsInN1YiI6InN0cmluZyIsImFjY291bnQiOnsiaWQiOjMsInVzZXJuYW1lIjoic3RyaW5nIiwiaGFzaGVkX3Bhc3N3b3JkIjoiJDJiJDEyJDFPTWtpZ0VQaC84MUNBcmdXSDdtZy4xcDN6b0VXSC5yamIxSXVEQ1lMYUguTjZhbTlOaDdxIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIiwiYm9vdGNhbXAiOiJzdHJpbmciLCJwaWN0dXJlIjoic3RyaW5nIn19.qz-0TLjAsHyrUVDvf84MkvxAln2IGdIbDM2UE10Rvvg",
  "token_type": "Bearer",
  "account": {
    "id": 3,
    "username": "string",
    "hashed_password": "$2b$12$1OMkigEPh/81CArgWH7mg.1p3zoEWH.rjb1IuDCYLaH.N6am9Nh7q",
    "email": "string",
    "role": "string",
    "bootcamp": "string",
    "picture": "string"
  }
}
```

## Jobs

- **Method**: `POST`, `GET`, `PUT`, `DELETE`
- **Path**: `/jobs`, `/jobs/{job_id}`

Input:

```json
{
  "company_name": "string",
  "job_title": "string",
  "job_description": "string",
  "location": "string",
  "department": "string",
  "level": "string",
  "job_link": "string",
  "created_on": "2023-07-25",
  "created_by": "string"
}
```

Output:

```json

{
  "id": 2,
  "company_name": "string",
  "job_title": "string",
  "job_description": "string",
  "location": "string",
  "department": "string",
  "level": "string",
  "job_link": "string",
  "created_on": "2023-07-25",
  "created_by": "string"
}
```

## Posts

- **Method**: `POST`, `GET`, `PUT`, `DELETE`
- **Path**: `/posts`, `/posts/{post_id}`

Input:

```json
{
  "title": "string",
  "created_datetime": "2023-07-25T18:23:24.495Z",
  "description": "string",
  "owner_username": "string"
}
```

Output:

```json

{
  "id": 0,
  "title": "string",
  "created_datetime": "2023-07-25T18:23:24.496Z",
  "description": "string",
  "owner_username": "string"
}
```

## Comments

- **Method**: `POST`, `GET`, `PUT`, `DELETE`
- **Path**: `/posts/{post_id}/comments`, `/posts/{post_id}/comments/{comment_id}`

Input:

```json
{
  "title": "string",
  "created_datetime": "2023-07-25T18:23:24.495Z",
  "description": "string",
  "owner_username": "string"
}
```

Output:

```json

{
  "id": 0,
  "title": "string",
  "created_datetime": "2023-07-25T18:23:24.496Z",
  "description": "string",
  "owner_username": "string"
}
```

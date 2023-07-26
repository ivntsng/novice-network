# Data models



### Users

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | int    | yes    | no       |
| username         | string | yes    | no       |
| hashed_password  | string | no     | no       |
| email            | string | yes    | no       |
| bootcamp         | string | no     | yes      |
| picture          | string | no     | yes      |

### Jobs

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | int    | yes    | no       |
| company_name     | string | no     | no       |
| job_title        | string | no     | no       |
| job_description  | string | no     | no       |
| location         | string | no     | no       |
| department       | string | no     | no       |
| level            | string | no     | no       |
| job_link         | string | no     | no       |
| created_on       | date   | no     | no       |
| created_by       | string | no     | no       |

### Posts

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | int    | yes    | no       |
| title            | string | no     | no       |
| created_datetime | datetime | no     | no       |
| description      | string | no     | no       |
| owner_username   | string | no     | no       |

### Comments

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| comment_id       | int    | yes    | no       |
| post_id          | int    | no     | no       |
| comment          | string | no     | no       |
| created_on     | datetime | no     | no       |
| owner_username   | string | no     | no       |

### Replies

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| reply_id         | int    | yes    | no       |
| comment_id       | int    | no     | no       |
| owner_username   | string | no     | no       |
| created_on     | datetime | no     | no       |
| reply            | string | no     | no       |

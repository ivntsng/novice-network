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

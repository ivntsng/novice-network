from main import app
from fastapi.testclient import TestClient
from routers.comments import CommentRepository, CommentOut, CommentIn

client = TestClient(app)


class EmptyComments:
    def get_all(self, post_id: int):
        return []


class CreateComment:
    def create(self, post_id: int, comment: CommentIn) -> CommentOut:
        result = {
            "comment_id": 1,
            "post_id": post_id,
            "owner_username": comment.owner_username,
            "comment": comment.comment,
            "created_on": comment.created_on,
        }
        result.update(comment.dict())
        return CommentOut(**result)


def test_get_all_comments():
    app.dependency_overrides[CommentRepository] = EmptyComments
    response = client.get("/posts/1/comments")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_comment():
    app.dependency_overrides[CommentRepository] = CreateComment
    json = {
        "post_id": 1,
        "owner_username": "user1",
        "comment": "This is a comment",
        "created_on": "2023-07-20T12:34:56",
    }
    expected = {
        "comment_id": 1,
        "post_id": 1,
        "owner_username": "user1",
        "comment": "This is a comment",
        "created_on": "2023-07-20T12:34:56",
    }
    response = client.post("/posts/1/comments", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected

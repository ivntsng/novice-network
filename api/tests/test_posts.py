from fastapi.testclient import TestClient
from main import app
from queries.posts import PostRepository, PostIn, PostOut

client = TestClient(app)

class EmptyPostRepository:
    def get_all(self):
        return []

class CreatePostQueries:
    def create(self, post: PostIn) -> PostOut:
        result = {
                "id": 1,
                "title": "Blah",
                "created_datetime": "2023-01-20T34:18:18.266000",
                "description": "Blah Blah Blah",
                "owner_username": "Test"
            }
        result.update(post.dict())
        return PostOut(**result)


def test_get_all_posts():
    app.dependency_overrides[PostRepository] = EmptyPostRepository

    response = client.get("/posts/")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []

def test_create_post():
    app.dependency_overrides[PostRepository] = CreatePostQueries

    json = {
            "title": "Blah",
            "created_datetime": "2023-01-20T14:18:18.266000",
            "description": "Blah Blah Blah",
            "owner_username": "Test"
        }

    expected = {
                "id": 1,
                "title": "Blah",
                "created_datetime": "2023-01-20T14:18:18.266000",
                "description": "Blah Blah Blah",
                "owner_username": "Test"
            }

    response = client.post("/posts", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected

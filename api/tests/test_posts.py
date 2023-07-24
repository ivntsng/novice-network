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

class DeletePostQueries:
    def delete(self, post_id: int) -> bool:
        return True

class UpdatePostQueries:
    def update(self, post_id: int, post: PostIn) -> PostOut:
        result = {
                "id": 2,
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

def test_delete_post():
    app.dependency_overrides[PostRepository] = DeletePostQueries

    response = client.delete("/posts/1")

    app.dependency_overrides = {}

    assert response.status_code == 200

def test_update_post():
    app.dependency_overrides[PostRepository] = UpdatePostQueries

    json = {
            "title": "Meh",
            "created_datetime": "2023-01-20T14:18:18.266000",
            "description": "Blah Blah Blah",
            "owner_username": "Test1"
        }

    expected = {
                "id": 2,
                "title": "Meh",
                "created_datetime": "2023-01-20T14:18:18.266000",
                "description": "Blah Blah Blah",
                "owner_username": "Test1"
            }

    response = client.put("/posts/2", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected

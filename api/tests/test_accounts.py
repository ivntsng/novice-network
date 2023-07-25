import sys
import os


current_directory = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_directory, ".."))
sys.path.append(project_root)

from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepo, AccountIn, AccountOut
from authenticator import authenticator

client = TestClient(app)


class EmptyAccountRepo:
    def get_one(self, username: str):
        return {
            "id": 1,
            "username": "testy",
            "hashed_password": "test",
            "email": "Test@test.com",
            "role": "test",
            "bootcamp": "test camp",
            "picture": "pictureurl.com",
        }

    def get_all(self):
        return []


class DeleteAccount:
    def delete(self, account_id: int):
        return True


def test_get_one():
    app.dependency_overrides[AccountRepo] = EmptyAccountRepo
    response = client.get("/users/testy")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "username": "testy",
        "hashed_password": "test",
        "email": "Test@test.com",
        "role": "test",
        "bootcamp": "test camp",
        "picture": "pictureurl.com",
    }


def test_delete_account():
    app.dependency_overrides[AccountRepo] = DeleteAccount
    response = client.delete("/users/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json()


def test_get_all_posts():
    app.dependency_overrides[AccountRepo] = EmptyAccountRepo

    response = client.get("/users")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []
>>>>>>> api/tests/test_accounts.py

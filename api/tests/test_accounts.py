import sys
import os

current_directory = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_directory, ".."))
sys.path.append(project_root)

from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepo


client = TestClient(app)


class EmptyAccountRepo:
    def get_one(self, username: str):
        return {
            "id": 1,
            "username": "testy",
            "hashed_password": "test",
            "email": "Test@test.com",
            "role": "test",
        }


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
    }

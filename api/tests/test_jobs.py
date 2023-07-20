from main import app
from fastapi.testclient import TestClient
from routers.jobs import JobRepository, JobOut, JobsIn

client = TestClient(app)


class EmptyJobs:
    def get_all(self):
        return []


class CreateJob:
    def create(self, job: JobsIn) -> JobOut:
        result = {
            "id": 4,
            "company_name": "Cruise",
            "job_title": "SWE",
            "job_description": "Bleh",
            "location": "Remote",
            "department": "Engineering",
            "level": "Entry",
            "job_link": "helloworld.com",
            "created_on": "2023-07-20",
        }
        result.update(job.dict())
        return JobOut(**result)


def test_get_all_jobs():
    app.dependency_overrides[JobRepository] = EmptyJobs
    response = client.get("/jobs/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_job():
    app.dependency_overrides[JobRepository] = CreateJob
    json = {
        "company_name": "Cruise",
        "job_title": "SWE",
        "job_description": "Bleh",
        "location": "Remote",
        "department": "Engineering",
        "level": "Entry",
        "job_link": "helloworld.com",
        "created_on": "2023-07-20",
    }
    expected = {
        "id": 4,
        "company_name": "Cruise",
        "job_title": "SWE",
        "job_description": "Bleh",
        "location": "Remote",
        "department": "Engineering",
        "level": "Entry",
        "job_link": "helloworld.com",
        "created_on": "2023-07-20",
    }
    response = client.post("/jobs", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected

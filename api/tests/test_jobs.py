from fastapi.testclient import TestClient
from main import app
from queries.jobs import JobRepository, JobOut, JobsIn

client = TestClient(app)
originalJobId = {
    "id": 4,
    "company_name": "Cruise",
    "job_title": "SWE",
    "job_description": "Bleh",
    "location": "Remote",
    "department": "Engineering",
    "level": "Entry",
    "job_link": "helloworld.com",
    "created_on": "2023-07-20",
    "created_by": "casper",
}


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
            "created_by": "casper",
        }
        result.update(job.dict())
        return JobOut(**result)


class UpdateJob:
    def update(self, job_id: int, job: JobsIn) -> JobOut:
        result = {
            "id": 4,
            "company_name": "Zoox",
            "job_title": "SWE",
            "job_description": "Bleh",
            "location": "Remote",
            "department": "Engineering",
            "level": "Entry",
            "job_link": "helloworld.com",
            "created_on": "2023-07-20",
            "created_by": "casper",
        }
        result.update(job.dict())
        return JobOut(**result)


class DeleteJob:
    def delete(self, job_id: int):
        return True


def test_get_all_jobs():
    app.dependency_overrides[JobRepository] = EmptyJobs
    response = client.get("/jobs/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_job():
    app.dependency_overrides[JobRepository] = CreateJob
    json = {
        "company_name": "Zoox",
        "job_title": "SWE",
        "job_description": "Bleh",
        "location": "Remote",
        "department": "Engineering",
        "level": "Entry",
        "job_link": "helloworld.com",
        "created_on": "2023-07-20",
        "created_by": "casper",
    }
    expected = {
        "id": 4,
        "company_name": "Zoox",
        "job_title": "SWE",
        "job_description": "Bleh",
        "location": "Remote",
        "department": "Engineering",
        "level": "Entry",
        "job_link": "helloworld.com",
        "created_on": "2023-07-20",
        "created_by": "casper",
    }
    response = client.post("/jobs", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_update_job():
    app.dependency_overrides[JobRepository] = UpdateJob
    json = {
        "company_name": "Zoox",
        "job_title": "SWE",
        "job_description": "Bleh",
        "location": "Remote",
        "department": "Engineering",
        "level": "Entry",
        "job_link": "helloworld.com",
        "created_on": "2023-07-20",
        "created_by": "casper",
    }
    expected = {
        "id": 4,
        "company_name": "Zoox",
        "job_title": "SWE",
        "job_description": "Bleh",
        "location": "Remote",
        "department": "Engineering",
        "level": "Entry",
        "job_link": "helloworld.com",
        "created_on": "2023-07-20",
        "created_by": "casper",
    }
    response = client.put("/jobs/4", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_delete_job():
    app.dependency_overrides[JobRepository] = DeleteJob
    response = client.delete("/jobs/4")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json()

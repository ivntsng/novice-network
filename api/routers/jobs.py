from fastapi import APIRouter, Depends
from queries.jobs import JobsIn, JobRepository

router = APIRouter()


@router.post("/jobs")
def create_jobs(job: JobsIn, repo: JobRepository = Depends()):
    return repo.create(job)

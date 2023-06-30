from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.jobs import Error, JobsIn, JobRepository, JobOut

router = APIRouter()


@router.post("/jobs", response_model=Union[JobOut, Error])
def create_jobs(
    job: JobsIn,
    response: Response,
    repo: JobRepository = Depends(),
):
    return repo.create(job)


@router.get("/jobs", response_model=Union[List[JobOut], Error])
def get_all(
    repo: JobRepository = Depends(),
):
    return repo.get_all()

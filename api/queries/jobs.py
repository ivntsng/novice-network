from pydantic import BaseModel
from typing import Optional
from datetime import date
from queries.pool import pool


class JobsIn(BaseModel):
    company_name: str
    job_title: str
    job_description: str
    location: str
    department: str
    level: str
    created_on: date


class JobOut(BaseModel):
    id: int
    company_name: str
    job_title: str
    job_description: str
    location: str
    department: str
    level: str
    created_on: date


class JobRepository:
    def create(self, job: JobsIn) -> JobOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO job
                      (company_name, job_title, job_description, location, department, level, created_on)
                    VALUES
                      (%s, %s, %s, %s, %s, %s , %s)
                    RETURNING id
                    """,
                    [
                        job.company_name,
                        job.job_title,
                        job.job_description,
                        job.location,
                        job.department,
                        job.level,
                        job.created_on,
                    ],
                )
                id = result.fetchone()[0]
                old_data = job.dict()
                return JobOut(id=id, **old_data)

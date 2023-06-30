from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


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
    def update(self, job_id: int, job: JobsIn) -> Union[JobOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE job
                        SET company_name = %s
                          , job_title = %s
                          , job_description = %s
                          , location = %s
                          , department = %s
                          , level = %s
                          , created_on = %s
                        WHERE id = %s
                        """,
                        [
                            job.company_name,
                            job.job_title,
                            job.job_description,
                            job.location,
                            job.department,
                            job.level,
                            job.created_on,
                            job_id,
                        ],
                    )
                    return self.job_in_to_out(job_id, job)
        except Exception:
            return {"message": f"Could not update the {job_id}"}

    def get_all(self) -> Union[List[JobOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, company_name, job_title, job_description, location, department, level, created_on
                        FROM job
                        ORDER BY created_on
                        """
                    )
                    return [
                        JobOut(
                            id=job_records[0],
                            company_name=job_records[1],
                            job_title=job_records[2],
                            job_description=job_records[3],
                            location=job_records[4],
                            department=job_records[5],
                            level=job_records[6],
                            created_on=job_records[7],
                        )
                        for job_records in db
                    ]
        except Exception:
            return {"message": "Could not grab the list of jobs."}

    def create(self, job: JobsIn) -> JobOut:
        try:
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
                    # old_data = job.dict()
                    # return JobOut(id=id, **old_data)
                    return self.job_in_to_out(id, job)
        except Exception:
            return {"message": "Could not create job posting."}

    def job_in_to_out(self, id: int, job: JobsIn):
        old_data = job.dict()
        return JobOut(id=id, **old_data)

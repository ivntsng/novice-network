from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool
from fastapi import HTTPException, Depends
import datetime


class Error(BaseModel):
    message: str


class JobsIn(BaseModel):
    company_name: str
    job_title: str
    job_description: str
    location: str
    department: str
    level: str
    job_link: str
    created_on: date = str(date.today())


class JobOut(BaseModel):
    id: int
    company_name: str
    job_title: str
    job_description: str
    location: str
    department: str
    level: str
    job_link: str
    created_on: date


class JobRepository:
    def get_job(self, job_id: int) -> Union[JobOut, dict]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, company_name, job_title, job_description, location, department, level, job_link, created_on
                        FROM job
                        WHERE id = %s
                        """,
                        [job_id],
                    )
                    record = db.fetchone()
                    if record is None:
                        raise HTTPException(
                            status_code=404,
                            detail=f"Job ID {job_id} does not exist.",
                        )
                    return self.record_to_job_out(record)
        except HTTPException as e:
            raise e

    def delete(self, job_id: int) -> None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM job
                        WHERE id = %s
                        """,
                        [job_id],
                    )
                    if db.rowcount == 0:
                        raise HTTPException(
                            status_code=404,
                            detail=f"Job ID {job_id} does not exist.",
                        )
            conn.commit()
            raise HTTPException(
                status_code=200,
                detail=f"Successfully deleted {job_id}.",
            )
        except HTTPException as e:
            raise e

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
                          , job_link = %s
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
                            job.job_link,
                            job.created_on,
                            job_id,
                        ],
                    )
                    return self.job_in_to_out(job_id, job)
        except Exception as e:
            print(f"Failed to update {job_id} due to: ", e)
            return {"message": f"Could not update job ID: {job_id}"}

    def get_all(self) -> Union[List[JobOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, company_name, job_title, job_description, location, department, level, job_link, created_on
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
                            job_link=job_records[7],
                            created_on=job_records[8],
                        )
                        for job_records in db
                    ]
        except Exception as e:
            print("Failed to grab job due to: ", e)
            return {"message": "Could not grab the list of jobs."}

    def create(self, job: JobsIn) -> JobOut:
        created_on = datetime.date.today()
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO job
                        (company_name, job_title, job_description, location, department, level, job_link, created_on)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id, company_name, job_title, job_description, location, department, level, job_link, created_on
                        """,
                        [
                            job.company_name,
                            job.job_title,
                            job.job_description,
                            job.location,
                            job.department,
                            job.level,
                            job.job_link,
                            str(created_on),
                        ],
                    )
                    record = db.fetchone()
                    id = record[0]
                    return self.record_to_job_out(record)
        except Exception as e:
            print(f"Console Error: {str(e)}")
            return {"message": "Could not create job posting."}

    def job_in_to_out(self, id: int, job: JobsIn):
        old_data = job.dict()
        return JobOut(id=id, **old_data)

    def record_to_job_out(self, record):
        return JobOut(
            id=record[0],
            company_name=record[1],
            job_title=record[2],
            job_description=record[3],
            location=record[4],
            department=record[5],
            level=record[6],
            job_link=record[7],
            created_on=record[8],
        )

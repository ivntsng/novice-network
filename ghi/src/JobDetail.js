import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JobDetail() {
  const { jobs_id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/jobs/${jobs_id}?job_id=${jobs_id}`
        );
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error grabbing job details: ", error);
      }
    };

    fetchData();
  }, [jobs_id]);

  return (
    <div className="border-box-job-detail">
      {job ? (
        <>
          <h1>Job details for {job.company_name}</h1>
          <div>{job.company_name}</div>
          <div>{job.job_title}</div>
          <div>{job.job_description}</div>
          <div>{job.location}</div>
          <div>{job.department}</div>
          <div>{job.level}</div>
          <div>{job.created_on}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

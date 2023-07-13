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
    <div className="job-detail-container">
      {job ? (
        <div className="job-detail">
          <h2 className="detail-company-name">{job.company_name}</h2>
          <h1 className="detail-job-title">
            {job.job_title.replace(/, /g, ",\n")}
          </h1>
          <div className="job-detail-content">
            <div className="job-description-container">
              <div className="job-description">
                <p>{job.job_description}</p>
              </div>
            </div>
            <div className="job-details-container">
              <div className="detail-info-container">
                <div className="detail-info-item">
                  <span className="detail-info-label">Location:</span>
                  <span className="detail-info-value">{job.location}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Department:</span>
                  <span className="detail-info-value">{job.department}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Level:</span>
                  <span className="detail-info-value">{job.level}</span>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">Created On:</span>
                  <span className="detail-info-value">
                    {new Date(job.created_on).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

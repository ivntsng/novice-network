import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JobDetail({ setCurrentJobId, deleteJob }) {
  const { jobs_id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/jobs/${jobs_id}?job_id=${jobs_id}`
        );
        const data = await response.json();
        setJob(data);
        setCurrentJobId(jobs_id);
      } catch (error) {
        console.error("Error grabbing job details: ", error);
      }
    };

    fetchData();
  }, [jobs_id, setCurrentJobId]);

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
                <div className="detail-info-item">
                  <span className="detail-info-label">Job ID:</span>
                  <span className="detail-info-value">{job.id}</span>
                </div>
                <div className="detail-info-item ">
                  <Link target="_blank" to={job.job_link}>
                    <button className="detail-info-label btn btn-primary">
                      Apply to job
                    </button>
                  </Link>
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

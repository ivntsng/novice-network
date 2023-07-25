import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

export default function JobDetail({ setCurrentJobId, deleteJob }) {
  const { jobs_id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const { userData, setUserData } = useContext(UserContext);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDelete = () => {
    setDeleteConfirmation(true);
  };

  const confirmDeleteJob = () => {
    navigate(`/jobs/${jobs_id}/delete`);
    setDeleteConfirmation(false);
  };

  const cancelDeleteJob = () => {
    setDeleteConfirmation(false);
  };

  const handleEditJob = () => {
    navigate(`/jobs/${jobs_id}/edit`);
  };

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

  console.log("created by:", job && job.created_by);
  console.log("userData: ", userData.username);

  return (
    <div className="job-detail-container">
      {job ? (
        <div className="job-detail">
          <div>
            <h2 className="detail-company-name">{job.company_name}</h2>
            <h1 className="detail-job-title">
              {job.job_title.replace(/, /g, ",\n")}
            </h1>
          </div>
          <div className="detail-header">
            {job && job.created_by === userData.username && (
              <div className="button-group">
                <button className="btn btn-secondary" onClick={handleEditJob}>
                  Edit Job
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Job
                </button>
              </div>
            )}
            {deleteConfirmation && (
              <div className="delete-prompt-overlay">
                <div className="delete-prompt">
                  <p>Are you sure you want to delete the job posting?</p>
                  <div className="prompt-actions">
                    <button
                      className="btn btn-danger"
                      onClick={() => confirmDeleteJob(jobs_id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={cancelDeleteJob}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
                <div className="detail-info-item">
                  <span className="detail-info-label">Created By:</span>
                  <span className="detail-info-value">{job.created_by}</span>
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

import React from "react";
import { Link } from "react-router-dom";

export default function ListJobs({ listJobs, getJobs }) {
  if (!listJobs || listJobs.length === 0) {
    return <div className="vh-100">There are no jobs available.</div>;
  }

  const sortJob = Array.isArray(listJobs)
    ? listJobs.sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
    : [];

  return (
    <div className="job-container">
      <h1 className="job-list">Latest Job Posting</h1>
      <div className="jobs-container">
        {sortJob.length > 0 ? (
          sortJob.map((job) => (
            <Link className="job-linking" to={`/jobs/${job.id}`} key={job.id}>
              <div className="border-box" key={job.id}>
                <div className="job-details">
                  <h3>{job.job_title.replace(/, /g, ",\n")}</h3>
                  <div className="details-separator"></div>
                  <div className="additional-details">
                    <div className="detail-row">
                      <div className="detail-label">Location:</div>
                      <div className="detail-value">{job.location}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Department:</div>
                      <div className="detail-value">{job.department}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Level:</div>
                      <div className="detail-value">{job.level}</div>
                    </div>
                  </div>
                </div>
                <div className="job-company">{job.company_name}</div>
              </div>
            </Link>
          ))
        ) : (
          <div>There are no jobs available.</div>
        )}
      </div>
    </div>
  );
}

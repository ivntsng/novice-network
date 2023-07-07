import React from "react";

export default function ListJobs({ listJobs, getJobs }) {
  if (!listJobs || listJobs.length === 0) {
    return <div>Loading list of jobs...</div>;
  }
  return (
    <div className="container">
      <h1 className="job-list">Latest Job Posting</h1>
      <div className="jobs-container">
        {listJobs.map((job) => (
          <div className="border-box" key={job.id}>
            <div className="job-details">
              <h3>{job.job_title}</h3>
              <div className="additional-details">
                <div>{job.location}</div>
                <div>{job.department}</div>
                <div className="level">Level:</div>
                <div className="job-level">{job.level}</div>
              </div>
            </div>
            <div className="job-description">Posted On: {job.created_on}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

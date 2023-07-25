import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function CreateJob({ getJobs }) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [link, setLink] = useState("");
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCompanyNameChange = (e) => {
    const value = e.target.value;
    setCompanyName(value);
  };

  const handleJobTitleChange = (e) => {
    const value = e.target.value;
    setJobTitle(value);
  };

  const handleJobDescriptionChange = (e) => {
    const value = e.target.value;
    setJobDescription(value);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setDepartment(value);
  };

  const handleLevelChange = (e) => {
    const value = e.target.value;
    setLevel(value);
  };

  const handleLinkChange = (e) => {
    const value = e.target.value;
    setLink(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.company_name = companyName;
    data.job_title = jobTitle;
    data.job_description = jobDescription;
    data.location = location;
    data.department = department;
    data.level = level;
    data.job_link = link;
    data.created_by = userData.username;

    const createJobUrl = "http://localhost:8000/jobs";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(createJobUrl, fetchConfig);
    if (response.ok) {
      setCompanyName("");
      setJobTitle("");
      setJobDescription("");
      setLocation("");
      setDepartment("");
      setLevel("");
      setLink("");
      getJobs();
      navigate("/jobs");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create job listing</h1>
          <form onSubmit={handleSubmit} id="create-job-posting-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleCompanyNameChange}
                value={companyName}
                placeholder="company-name"
                required
                type="text"
                id="company-name"
                className="form-control"
              />
              <label htmlFor="company-name">Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleJobTitleChange}
                value={jobTitle}
                placeholder="job-title"
                required
                type="text"
                id="job-title"
                className="form-control"
              />
              <label htmlFor="job-title">Job Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleJobDescriptionChange}
                value={jobDescription}
                placeholder="job-description"
                required
                type="text"
                id="job-description"
                className="form-control"
                rows="10"
                cols="30"
              />
              <label htmlFor="job-description">Job Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLocationChange}
                value={location}
                placeholder="location"
                required
                type="text"
                id="location"
                className="form-control"
              />
              <label htmlFor="location">Location</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDepartmentChange}
                value={department}
                placeholder="department"
                required
                type="text"
                id="department"
                className="form-control"
              />
              <label htmlFor="department">Department</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLevelChange}
                value={level}
                placeholder="job-level"
                required
                type="text"
                id="job-level"
                className="form-control"
              />
              <label htmlFor="job-level">Job Level</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLinkChange}
                value={link}
                placeholder="job-link"
                required
                type="text"
                id="job-link"
                className="form-control"
              />
              <label htmlFor="job-link">Job Link</label>
            </div>
            {/* <div className="form-floating mb-3">
              <input
                onChange={handleCreatedOnChange}
                value={createdOn}
                placeholder="created-on"
                required
                type="date"
                id="date"
                className="form-control"
              />
              <label htmlFor="date">Today's Date</label>
            </div> */}
            <button className="btn btn-primary" type="submit">
              Create job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

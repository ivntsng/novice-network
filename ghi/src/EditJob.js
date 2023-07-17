import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditJob({ currentJobId, getJobs }) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobDetails();
    getJobs();
  }, []);

  async function fetchJobDetails() {
    try {
      const response = await fetch(
        `http://localhost:8000/jobs/${currentJobId}?job_id=${currentJobId}`
      );
      if (response.ok) {
        const data = await response.json();
        setCompanyName(data.company_name);
        setJobTitle(data.job_title);
        setJobDescription(data.job_description);
        setLocation(data.location);
        setDepartment(data.department);
        setLevel(data.level);
        setLink(data.job_link);
      } else {
        console.error("Failed to fetch job details");
      }
    } catch (error) {
      console.error("Error occurred during job details fetching: ", error);
    }
  }

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
    const data = {
      company_name: companyName,
      job_title: jobTitle,
      job_description: jobDescription,
      location: location,
      department: department,
      level: level,
      job_link: link,
    };

    const editUrl = `http://localhost:8000/jobs/${currentJobId}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(editUrl, fetchConfig);
      if (response.ok) {
        getJobs();
        navigate(`/jobs/${currentJobId}`);
      } else {
        console.error("There was an error updating the job.");
      }
    } catch (e) {
      console.log("There was an error: ", e);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Edit job listing</h1>
          <form onSubmit={handleSubmit} id="edit-job-posting-form">
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
                rows="4"
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
            <button className="btn btn-primary" type="submit">
              Update job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

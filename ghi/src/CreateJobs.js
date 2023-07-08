import { React, useState } from "react";

export default function CreateJob({ getJobs }) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [createdOn, setCreatedOn] = useState("");

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

  const handleCreatedOnChange = (e) => {
    const value = e.target.value;
    setCreatedOn(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.companyName = companyName;
    data.jobTitle = jobTitle;
    data.jobDescription = jobDescription;
    data.location = location;
    data.department = department;
    data.level = level;
    data.createdOn = createdOn;

    const createJobUrl = "http://localhost:8000/jobs";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "applicaiton/json",
      },
    };

    const response = await fetch(createJobUrl, fetchConfig);
    if (response.ok) {
      const newJob = await response.json();
      setCompanyName("");
      setJobTitle("");
      setJobDescription("");
      setLocation("");
      setDepartment("");
      setLevel("");
      setCreatedOn("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create job listing</h1>
        </div>
      </div>
    </div>
  );
}

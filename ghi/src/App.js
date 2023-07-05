import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Nav from "./Nav";
import MainPage from "./MainPage.js";
import JobsList from "./Jobs.js";

function App() {
  const [jobs, setJobs] = useState([]);

  async function getJobs() {
    const jobsUrl = "http://localhost:8000/jobs/";
    const response = await fetch(jobsUrl);
    if (response.ok) {
      const data = await response.json();
      setJobs(data.jobs);
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="jobs">
            <Route
              index
              element={<JobsList jobsList={jobs} getJobs={getJobs} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

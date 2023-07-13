import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const jobsPage = location.pathname === "/jobs";
  const jobsDetailPage = location.pathname.startsWith("/jobs/");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          NoviceNetwork
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobs">
                Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts">
                Forum
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about-us">
                About Us
              </NavLink>
            </li>
          </ul>
          {jobsDetailPage && (
            <ul className="navbar-nav ml-auto jobs-page">
              <li className="nav-edit-job">
                <NavLink className="nav-link" to={"/jobs/edit"}>
                  Edit Job
                </NavLink>
              </li>
              <li className="nav-delete-job">
                <NavLink className="nav-link" to={"/jobs/deletez"}>
                  Delete Job
                </NavLink>
              </li>
            </ul>
          )}
          {jobsPage && (
            <ul className="navbar-nav ml-auto jobs-page">
              <li className="nav-create-job">
                <NavLink className="nav-link" to="/jobs/create">
                  Create Job
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

import React, { useState, useContext } from "react";
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuthContext, useToken } from "@galvanize-inc/jwtdown-for-react";
import { UserContext } from "./UserContext";
import Logout from "./Logout";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobsPage = location.pathname === "/jobs";
  const jobsDetailPage = location.pathname.startsWith("/jobs/");
  const createJobPage = location.pathname === "/jobs/create";
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { jobs_id } = useParams();
  const { userData, setUserData } = useContext(UserContext);

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

  const handleLogoutClick = () => {
    navigate("/logout");
  };

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
            {userData.username && (
              <>
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
                <li>
                  <NavLink className="nav-link" to="/users/:username">
                    My Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about-us">
                    About Us
                  </NavLink>
                </li>
              </>
            )}
          </ul>
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
      {userData.username && (
        <div className="user-info">
          <span className="nav-link">Hello {userData.username}</span>
          <button
            className="btn btn-danger"
            id="logout"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

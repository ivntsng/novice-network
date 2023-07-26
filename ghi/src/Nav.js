import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobsPage = location.pathname === "/jobs";
  const { userData } = useContext(UserContext);

  console.log(userData);

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
                  <NavLink
                    className="nav-link"
                    to={`/users/${userData.username}/`}
                  >
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
          {jobsPage &&
            userData.username &&
            (userData.role === "mentor" || userData.role === "recruiter") && (
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

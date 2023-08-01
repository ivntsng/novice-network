import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import logo from "./image/pplogo.png";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobsPage = location.pathname === "/jobs";
  const { userData } = useContext(UserContext);

  // State to keep track of the visibility of the navigation list
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Function to toggle the visibility of the navigation list
  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} height="50" alt="" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          // Use the state to determine the collapsed or expanded state of the navigation list
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavToggle} // Toggle the state when the hamburger menu is clicked
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Add the `show` class based on the state to show or hide the navigation list */}
        <div
          className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink id="Navitem" className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {userData.username && (
              <>
                <li className="nav-item">
                  <NavLink id="Navitem" className="nav-link" to="/jobs">
                    Jobs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink id="Navitem" className="nav-link" to="/posts">
                    Forum
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link"
                    id="Navitem"
                    to={`/users/${userData.username}/`}
                  >
                    My Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink id="Navitem" className="nav-link" to="/mentors">
                    Mentors
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/about-us">
                    About Us
                  </NavLink>
                </li> */}
              </>
            )}
          </ul>
          {jobsPage &&
            userData.username &&
            (userData.role === "mentor" || userData.role === "recruiter") && (
              <ul className="navbar-nav ml-auto jobs-page">
                <li className="nav-create-job">
                  <NavLink id="Navitem" className="nav-link" to="/jobs/create">
                    Create Job
                  </NavLink>
                </li>
              </ul>
            )}
        </div>
      </div>
      {userData.username && (
        <div className="user-info d-flex align-items-center">
          {" "}
          {/* Use flexbox to align the elements */}
          <span id="usernav" className="nav-link mr-2">Hello {userData.username}</span>{" "}
          {/* Added 'mr-2' class to add some margin */}
          &nbsp;&nbsp;
          <Link
                className="btn text-white btn-floating m-1"
                style={{backgroundColor: '#231d3c'}}
                to="/logout"
                role="button"
                >Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

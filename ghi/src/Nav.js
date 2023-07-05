import { NavLink, Link } from "react-router-dom";

export default function Nav() {
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
              <NavLink className="nav-link" exact="true" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobs">
                Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/placeholder">
                Forum
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/placerholder">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

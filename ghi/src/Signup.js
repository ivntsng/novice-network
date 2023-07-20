import { React, useState, useContext, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { register, token } = useToken();
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      username: username,
      password: password,
      email: email,
      role: role,
    };
    register(accountData, `${process.env.REACT_APP_API_HOST}/users`);
    e.target.reset();
    navigate("/");
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setRole(value);
  };

  const handleUserData = async () => {
    try {
      const url = `${process.env.REACT_APP_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const { id, username, email, role } = data.account;
        setUserData({
          id,
          username,
          email,
          role,
        });
        navigate("/");
      } else {
        // Handle error
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      handleUserData();
    }
  }, [token]);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a User</h1>
          <form onSubmit={handleRegistration} id="create-user-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleUsernameChange}
                value={username}
                placeholder="username"
                required
                type="text"
                id="username"
                className="form-control"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePasswordChange}
                value={password}
                placeholder="password"
                required
                type="password"
                id="password"
                className="form-control"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleEmailChange}
                value={email}
                placeholder="email"
                required
                type="email"
                id="email"
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleRoleChange}
                id="role"
                className="form-control"
              >
                <option>Choose a Role</option>
                <option value="grad">Grad</option>
                <option value="mentor">Mentor</option>
                <option value="recruiter">Recruiter</option>
              </select>
              <label htmlFor="role">Choose your role</label>
            </div>
            <button className="btn btn-primary" type="submit">
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

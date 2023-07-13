import { React, useState } from "react";

export default function CreateUser({ getUsers }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("grad");
  const [selectedOption, setSelectedOption] = useState("");

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
    console.log(value);
    setRole(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = username;
    data.password = password;
    data.email = email;
    data.role = role;

    const createUserUrl = "http://localhost:8000/users/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(createUserUrl, fetchConfig);
    if (response.ok) {
      setUsername("");
      setPassword("");
      setEmail("");
      setRole("");
      getUsers();
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a User</h1>
          <form onSubmit={handleSubmit} id="create-user-form">
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

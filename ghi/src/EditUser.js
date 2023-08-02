import { React, useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function EditUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { token } = useToken();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(UserContext);
  const [picture, setPicture] = useState("");
  const [bootcamp, setBootcamp] = useState("");

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setRole(value);
  };

  const handleBootcampChange = (event) => {
    const value = event.target.value;
    setBootcamp(value);
  };

  const handlePictureChange = (event) => {
    const value = event.target.value;
    setPicture(value);
  };

  const handleUserData = async () => {
    try {
      const url = `${process.env.REACT_APP_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const { id, username, email, role, bootcamp, picture } = data.account;
        setUserData({
          id,
          username,
          email,
          role,
          bootcamp,
          picture,
        });
      } else {
        // Handle error
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {};
    data.username = username;
    data.password = password;
    data.email = email;
    data.role = role;
    data.bootcamp = bootcamp;
    data.picture = picture;

    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/users/${userData.id}`,
      fetchConfig
    );
    if (response.ok) {
      navigate("/logout");
      alert("Please Log In for changes to take effect!");
    }
  };

  useEffect(() => {
    if (token) {
      handleUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="row vh-100">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Edit User</h1>
          <form onSubmit={handleEdit} id="create-user-form">
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
            <div className="form-floating mb-3">
              <input
                onChange={handleBootcampChange}
                value={bootcamp}
                required
                type="text"
                placeholder="bootcamp"
                id="bootcamp"
                className="form-control"
              />
              <label htmlFor="bootcamp">Bootcamp</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePictureChange}
                value={picture}
                required
                type="text"
                placeholder="Picture Url"
                id="picture"
                className="form-control"
              />
              <label htmlFor="picture">Profile Picture Url</label>
            </div>
            <button className="btn btn-primary" type="submit">
              Edit User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

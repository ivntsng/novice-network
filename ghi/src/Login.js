import { useState, useEffect, useContext } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();
  const navigate = useNavigate();
  const {userData, setUserData} = useContext(UserContext)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      e.target.reset();
    } catch (err) {
      e.target.reset();
    }
  };

  const handleUserData = async () => {
      try {
        const url = `${process.env.REACT_APP_API_HOST}/token`;
        const response = await fetch(url, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const { id, username, email, role } =
            data.account;
          setUserData({
            id,
            username,
            email,
            role,
          })
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
      handleUserData()
      ;
    }
  }, [token]);


  return (
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-floating mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-floating mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
      </div>
    </div>
  );
}

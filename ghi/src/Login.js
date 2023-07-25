import { useState, useEffect, useContext } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

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
        const { id, username, email, role, bootcamp, picture } = data.account;
        setUserData({
          id,
          username,
          email,
          role,
          bootcamp,
          picture,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-floating">

            <input

              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor ="floatingUsername">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              id = "floating input"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor = "floating input">Password</label>
          </div>


          <input type="submit" className="btn btn-primary" value="Login" />

          <p className="text-center mt-2 mb-3 text-muted">Dont have an account? <NavLink style={{textDecoration: 'none'}} to="/signup" >Sign Up!</NavLink></p>
          <p className="text-center mt-5 mb-3 text-muted">© 2023 Novice Network Inc.</p>

        </form>
      </div>
    </div>
  );
}

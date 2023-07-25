import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { UserContext } from "./UserContext";

export default function Logout() {
  const { logout } = useToken();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  async function handleLogout() {
    try {
      logout();
      localStorage.removeItem("token");
      setUserData({});
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleLogout();
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>Logging out...</p>;
}

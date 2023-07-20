import { useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout, token } = useToken();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleLogout();
    navigate("/");
  }, []);
}

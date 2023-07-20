import { useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
export default function Logout() {
  const { logout, token } = useToken();
  async function handleLogout() {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleLogout();
  });
}

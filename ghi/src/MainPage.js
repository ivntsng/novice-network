import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import MyCarousel from "./carousel";

export default function MainPage() {
  const { userData } = useContext(UserContext);

  return (
    <div className="container vh-100" id="mainpage">
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">
          Helping all graduates from All Bootcamps!
        </h1>
        <h2 className="display-6">
          Join the community to expand your professional network and foster
          meaningful connections with fellow bootcamp graduates.
        </h2>
        <div className="button-container">
          {userData && userData.username ? (
            <p></p>
          ) : (
            <>
              <Link
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#757191" }}
                to="/signup"
                role="button"
              >
                Sign Up
              </Link>
              <Link
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#231d3c" }}
                to="/login"
                role="button"
              >
                Log In
              </Link>
            </>
          )}
        </div>
        <MyCarousel />
      </div>
    </div>
  );
}

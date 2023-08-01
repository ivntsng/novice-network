import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import MyCarousel from "./carousel";

export default function MainPage() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const handleSignUpClick = () => {
    if (userData && userData.username) {
      alert("You are currently logged in.");
    } else {
      navigate("/signup");
    }
  };

  const handleLoginClick = () => {
    if (userData && userData.username) {
      alert("You are logged in already!");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container" id="mainpage">
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignUpClick}
              >
                Sign Up!
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleLoginClick}
              >
                Log in!
              </button>
            </>
          )}
        </div>
        <MyCarousel />
      </div>
    </div>
  );
}

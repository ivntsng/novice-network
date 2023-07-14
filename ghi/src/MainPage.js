import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">
          Helping all graduates from All Bootcamps!
        </h1>
        <h2 className="display-6">
          Join the community to expand your professional network and foster
          meaningful connections with fellow bootcamp graduates.
        </h2>
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Sign Up!
        </button>
      </div>
    </div>
  );
}

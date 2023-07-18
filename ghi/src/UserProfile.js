import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const userUrl = `http://localhost:8000/users/${username}`;
      try {
        const response = await fetch(userUrl);
        if (response.ok) {
          const userDetail = await response.json();
          setUser(userDetail);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchUser();
  });

  return (
    <>
      <div className="container my-5 py-5 text-dark">
        <div>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>
    </>
  );
}

export default UserProfile;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UserProfile({ posts }) {
  const [user, setUser] = useState([]);
  const [profilePicture, setProfilePicture] = useState(
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=900&t=st=1689793640~exp=1689794240~hmac=e563e17d9b9cdf146a04a698349e5cf2f8f8db7bb27fe14f96c0c4203620b779"
  );
  const { username } = useParams();
  const navigate = useNavigate();

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
  }, []);

  const userPosts = posts.filter(
    (post) => user.id.toString() === post.owner_id
  );

  return (
    <>
      <div className="container my-5 py-5 text-dark">
        <div>
          <h3>{user.username}</h3>
          <div className="w-25 h-25">
            <img className="img-thumbnail img.fluid" src={profilePicture}></img>
          </div>
          <p>{user.email}</p>
          <p>Role: {user.role}</p>
          <p>Number of posts: {userPosts.length} </p>
          <div className="row">
            {userPosts.map((post) => (
              <div className="col-sm-3" key={post.id}>
                <div
                  className="card"
                  style={{ width: "18rem", height: "12rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {post.owner_id}
                    </h6>
                    <p className="card-text line-clamp-3">{post.description}</p>
                    <Link className="card-link" to={`/posts/${post.id}`}>
                      read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UserProfile({ posts, userData }) {
  const userPosts = posts.filter(
    (post) => userData.username === post.owner_username
  );

  const navigate = useNavigate();

  const handleDelete = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/users/${userData.id}`;
    const fetchConfig = {
      method: "DELETE",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      navigate("/logout");
    } else {
      alert("Unable to delete account!");
    }
  };

  const handleEditUser = () => {
    navigate("/users/edit");
  };

  return (
    <>
      <div className=".container-lg my-5 py-5 text-dark profile-div">
        <div className="row">
          <div className="col">
            <div className="row my-3 py-3">
              <h2>{userData.username}</h2>
            </div>
            <div className="row w-50 h-50">
              <img
                className="img-thumbnail img.fluid"
                src={userData.picture}
                alt={`${userData.username}'s profile`}
              ></img>
            </div>
          </div>
          <div className="col my-5 py-5">
            <div className="row my-3 py-3">
              <p>{userData.email}</p>
            </div>
            <div className="row my-3 py-3">
              <p>Role: {userData.role}</p>
            </div>
            <div className="row my-3 py-3">
              <p>Number of posts: {userPosts.length} </p>
            </div>
            <div className="row my-3 py-3">
              <p>Bootcamp: {userData.bootcamp}</p>
            </div>
            <div className="row my-3 py-3">
              <button className="btn btn-primary" onClick={handleEditUser}>
                Edit Account Info
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </div>

          <div className="row my-3 py-3">
            <h3>My Posts</h3>
            {userPosts.map((post) => (
              <div className="col-sm-3 my-3 py-3" key={post.id}>
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

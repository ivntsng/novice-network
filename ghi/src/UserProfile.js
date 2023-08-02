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
    <div
      className="user-profile-container"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <section className="vh-50" style={{ backgroundColor: "#f4f5f7" }}>
        <div className="container py-5 h-80">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <img
                      src={userData.picture}
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h3>{userData.username}</h3>
                    <p>{userData.role}</p>
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{userData.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Bootcamp</h6>
                          <p className="text-muted">{userData.bootcamp}</p>
                        </div>
                      </div>
                      <h6>Posts</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Number of post</h6>
                          <p className="text-muted">{userPosts.length}</p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <button
                            className="btn btn-primary"
                            onClick={handleEditUser}
                          >
                            Edit Account Info
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row my-3 py-3">
          <h3>My Posts</h3>
          {userPosts.map((post) => (
            <div className="col-sm-3 my-3 py-3" key={post.id}>
              <div className="card" style={{ width: "18rem", height: "12rem" }}>
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
  );
}

export default UserProfile;

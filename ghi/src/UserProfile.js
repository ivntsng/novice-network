import React, { useState } from "react";

import { Link } from "react-router-dom";

function UserProfile({ posts, userData }) {
  const userPosts = posts.filter(
    (post) => userData.username === post.owner_username
  );

  return (
    <>
      <div className="container my-5 py-5 text-dark">
        <div>
          <h3>{userData.username}</h3>
          <div className="w-25 h-25">
            <img
              className="img-thumbnail img.fluid"
              src={userData.picture}
            ></img>
          </div>
          <p>{userData.email}</p>
          <p>Role: {userData.role}</p>
          <p>Number of posts: {userPosts.length} </p>
          <p>Bootcamp: {userData.bootcamp}</p>
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

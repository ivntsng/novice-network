import React from "react";
import { Link } from "react-router-dom";

function PostList({ posts }) {
  return (
    <>
      <div className="container my-5">
        <h1 className="text-center">The #1 Tech Bootcamp Community</h1>
        <h2 className="text-center">Welcome! Have a look around and join the discussions</h2>
        <div className="text-center">
          <Link to="/posts/create">
            <button type="button" className="btn btn-primary mt-3">
              Write a post
            </button>
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="row mt-4">
            {posts.map((post) => (
              <div className="col-md-4 mb-4" key={post.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title line-clamp-1">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      @{post.owner_username}
                    </h6>
                    <p className="card-text line-clamp-3">{post.description}</p>
                    <Link to={`/posts/${post.id}`} className="card-link text-muted">
                      Read more
                    </Link>
                  </div>
                  <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <i className="bi bi-chat-right-text"></i> 0
                        &nbsp;<i className="bi bi-eye"></i> 1
                      </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>No posts available.</p>
          </div>
        )}
      </div>
    </>
  );
}
export default PostList;

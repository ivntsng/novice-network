import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";

function CommentsSection({ post_id }) {
  const [comments, setComments] = useState([]);

  async function fetchComments() {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post_id}/comments`
      );
      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      } else {
        console.log("Error fetching comments");
      }
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  }

  async function deleteComment(comment_id) {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post_id}/comments/${comment_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchComments();
      } else {
        console.log("Error deleting comment");
      }
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  }

  async function updateComment(comment_id, updatedComment) {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post_id}/comments/${comment_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedComment),
        }
      );

      if (response.ok) {
        fetchComments();
      } else {
        console.log("Error updating comment");
      }
    } catch (error) {
      console.log("Error updating comment:", error);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  if (!comments) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="container my-5 py-5 text-dark">
        <div className="row d-flex justify-content-center">
          <div className="col-md-11 col-lg-9 col-xl-7">
            <div className="d-flex flex-column mb-4">
              <h4 className="mb-3">Comments</h4>
              {comments
                .sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
                .map((comment) => (
                  <div key={comment.comment_id} className="card w-100 mb-4">
                    <div className="card-body p-4 d-flex justify-content-between align-items-start">
                      <div>
                        <h5>
                          <strong>User {comment.user_id}:</strong>
                        </h5>
                        <p className="h5">{comment.comment}</p>
                      </div>
                      <div className="text-right ml-auto">
                        <small className="text-muted">
                          Posted on:{" "}
                          {new Date(comment.created_on).toLocaleString()}
                        </small>
                        <div className="mt-2">
                          <button
                            className="btn btn-sm btn-outline-primary ml-2"
                            style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                            onClick={() =>
                              updateComment(comment.comment_id, {})
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                            onClick={() => deleteComment(comment.comment_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <h5 className="mt-4">Add a Comment</h5>
            <CreateComment post_id={post_id} onCommentCreated={fetchComments} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;

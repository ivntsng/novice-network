import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateComment({ post_id, onCommentCreated }) {
  const [newComment, setNewComment] = useState("");
  const [UserId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commentData = {
      user_id: UserId,
      post_id,
      comment: newComment,
    };

    const response = await fetch(
      `http://localhost:8000/posts/${post_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );

    if (response.ok) {
      const commentDataResponse = await response.json();
      setNewComment("");
      setUserId("");
      if (onCommentCreated) {
        onCommentCreated();
      }
      navigate(`/posts/${post_id}`);
    } else {
      console.log("Error adding comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="add-comment-form">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Comment</h1>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleCommentChange}
                value={newComment}
                placeholder="Type your comment here"
                type="text"
                name="newComment"
                id="newComment"
                className="form-control"
                style={{ minHeight: "100px" }}
                required
              />
              <label htmlFor="newComment">Your Comment</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleUserIdChange}
                value={UserId}
                placeholder="User Id"
                type="number"
                name="userId"
                id="userId"
                className="form-control"
                required
              />
              <label htmlFor="userId">User ID</label>
            </div>
            <div className="text-center">
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateComment;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateReply({ post_id, comment_id, onReplyCreated }) {
  const [newReply, setNewReply] = useState("");
  const [UserId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleReplyChange = (event) => {
    setNewReply(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const replyData = {
      user_id: UserId,
      comment_id: comment_id,
      reply: newReply,
    };

    const response = await fetch(
      `http://localhost:8000/posts/${post_id}/comments/${comment_id}/replies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(replyData),
      }
    );

    if (response.ok) {
      const replyDataResponse = await response.json();
      setNewReply("");
      setUserId("");
      if (onReplyCreated) {
        onReplyCreated();
      }
      navigate(`/posts/${post_id}`);
    } else {
      console.log("Error adding reply");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="add-reply-form">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Reply</h1>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleReplyChange}
                value={newReply}
                placeholder="Type your reply here"
                type="text"
                name="newReply"
                id="newReply"
                className="form-control"
                style={{ minHeight: "100px" }}
                required
              />
              <label htmlFor="newReply">Your Reply</label>
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

export default CreateReply;

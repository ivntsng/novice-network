import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function CreateReply({ post_id, comment_id, onReplyCreated }) {
  const [newReply, setNewReply] = useState("");
  const { userData } = useContext(UserContext);
  const username = userData.username;

  const handleReplyChange = (event) => {
    setNewReply(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const replyData = {
      owner_username: username,
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
      setNewReply("");
      onReplyCreated && onReplyCreated(comment_id);
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
                placeholder="Leave a reply here..."
                name="newReply"
                id="newReply"
                className="form-control"
                style={{ minHeight: "100px" }}
                required
              />
              <label htmlFor="newReply">Your Reply</label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateReply;

import React, { useState } from "react";

function CreateReply({ post_id, comment_id, onReplyCreated }) {
  const [reply, setReply] = useState("");
  const [userId, setUserId] = useState("");

  async function createReply(e) {
    e.preventDefault();

    const requestBody = {
      user_id: userId,
      comment_id: comment_id,
      reply: reply,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/posts/${post_id}/comments/${comment_id}/replies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      onReplyCreated();
      setReply("");
    } else {
      console.log("Error creating reply");
    }
  }

  return (
    <form onSubmit={createReply} className="mb-4">
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        className="form-control mb-2"
      />
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="form-control mb-2"
      />
      <button type="submit" className="btn btn-primary">
        Submit Reply
      </button>
    </form>
  );
}

export default CreateReply;

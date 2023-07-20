import React, { useState } from "react";

function EditReply({ post_id, comment_id, reply_id, onReplyUpdated }) {
  const [reply, setReply] = useState("");

  async function handleUpdateReply(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reply }),
        }
      );

      if (response.ok) {
        setReply("");
        onReplyUpdated();
      } else {
        console.log("Error updating reply");
      }
    } catch (error) {
      console.log("Error updating reply:", error);
    }
  }

  return (
    <div className="card w-100 mb-4">
      <div className="card-body p-4 d-flex justify-content-between align-items-start">
        <div>
          <form onSubmit={handleUpdateReply}>
            <textarea
              className="form-control"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              required
            />
            <div className="mt-2 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Update Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditReply;

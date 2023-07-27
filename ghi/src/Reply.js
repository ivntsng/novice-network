import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import CreateReply from "./CreateReply";
import "./Reply.css";
import "./Comment.css";

function Reply({ reply, post_id, comment_id, fetchComments }) {
  const { userData } = useContext(UserContext);

  const [addingReplyTo, setAddingReplyTo] = useState(null);

  async function deleteReply() {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post_id}/comments/${comment_id}/replies/${reply.reply_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchComments();
      } else {
        console.log("Error deleting reply");
      }
    } catch (error) {
      console.log("Error deleting reply:", error);
    }
  }

  return (
    <div className="reply">
      <div className="reply-card w-100 mb-4">
        <div className="card-body p-4 d-flex justify-content-between align-items-start">
          <div className="text-left mr-auto">
            <h6>{userData.username}</h6>
            <p>{reply.reply}</p>
          </div>
          <div className="text-right ml-auto">
            <small className="text-muted">
              Replied on: {new Date(reply.created_on).toLocaleString()}
            </small>
            <div className="mt-2" style={{ marginLeft: "auto" }}>
              {userData.username === reply.username && (
                <>
                  <button
                    className="btn btn-sm comment-btn-outline-danger"
                    style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                    onClick={deleteReply}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {addingReplyTo === reply.reply_id && (
          <CreateReply
            post_id={post_id}
            comment_id={comment_id}
            onReplyCreated={fetchComments}
          />
        )}
      </div>
    </div>
  );
}
export default Reply;

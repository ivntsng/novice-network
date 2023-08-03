import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import "./Reply.css";
import "./Comment.css";

function Reply({ reply, post_id, comment_id, fetchComments }) {
  async function deleteReply() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/posts/${post_id}/comments/${comment_id}/replies/${reply.reply_id}`,
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

  const { userData } = useContext(UserContext);

  return (
    <div className="reply">
      <div className="reply-card w-100 mb-4">
        <div className="card-body p-4 d-flex justify-content-between align-items-start">
          <div className="text-left mr-auto">
            <h6>{reply.owner_username}</h6>
            <p>{reply.reply}</p>
          </div>
          <div className="text-right ml-auto">
            <small className="text-muted">
              Replied on: {new Date(reply.created_on).toLocaleString()}
            </small>
            <div className="mt-2" style={{ marginLeft: "auto" }}>
              {reply.owner_username === userData.username && (
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
      </div>
    </div>
  );
}

export default Reply;

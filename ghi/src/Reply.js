import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import EditReply from "./EditReply";

function Reply({ reply, post_id, comment_id, deleteReply, startEditingReply }) {
  const { userData } = useContext(UserContext);
  const username = userData.username;
  const [editingReply, setEditingReply] = useState(null);
  const [replyDetails, setReplyDetails] = useState(null);

  useEffect(() => {
    if (post_id && comment_id && reply && reply.reply_id) {
      fetchReplyDetails();
    }
  }, [post_id, comment_id, reply]);

  const fetchReplyDetails = async () => {
    const response = await fetch(
      `http://localhost:8000/posts/${post_id}/comments/${comment_id}/replies/${reply.reply_id}`
    );
    if (response.ok) {
      const replyDetails = await response.json();
      setReplyDetails(replyDetails);
    } else {
      console.error("Failed to fetch reply details");
    }
  };

  return (
    <div className="reply">
      <div className="card w-100 mb-4">
        <div className="card-body p-4 d-flex justify-content-between align-items-start">
          <div>
            <h6>
              <strong>{userData.username} says:</strong>
            </h6>
            {editingReply?.reply_id === reply.reply_id &&
            post_id &&
            comment_id &&
            reply.reply_id ? (
              <EditReply
                post_id={post_id}
                comment_id={comment_id}
                reply_id={reply.reply_id}
                onReplyUpdated={() => {
                  setEditingReply(null);
                  startEditingReply(reply.reply_id);
                }}
              />
            ) : (
              <p className="h6">{reply.reply}</p>
            )}
          </div>
          <div className="text-right ml-auto">
            <small className="text-muted">
              Replied on: {new Date(reply.created_on).toLocaleString()}
            </small>
            <div className="mt-2">
              {userData.username === username && (
                <>
                  <button
                    className="btn btn-sm btn-outline-primary ml-2"
                    style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                    onClick={() => startEditingReply(reply.reply_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                    onClick={() => deleteReply(comment_id, reply.reply_id)}
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

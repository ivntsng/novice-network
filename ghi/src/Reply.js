import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import EditReply from "./EditReply";

function Reply({
  reply,
  post_id,
  comment_id,
  deleteReply,
  startEditingReply,
  editingReplyId,
}) {
  const { userData } = useContext(UserContext);
  const username = userData.username;

  const { reply_id } = reply;

  useEffect(() => {
    if (post_id && comment_id && reply && reply.reply_id) {
      fetchReplyDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_id, comment_id, reply, reply.reply_id]);

  const fetchReplyDetails = async () => {
    const response = await fetch(
      `http://localhost:8000/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`
    );
    if (response.ok) {
      await response.json();
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
            {editingReplyId === reply.reply_id &&
            post_id &&
            comment_id &&
            reply_id ? (
              <EditReply
                post_id={post_id}
                comment_id={comment_id}
                reply_id={reply.reply_id}
                onReplyUpdated={() => {
                  startEditingReply(null);
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
                    onClick={() => deleteReply(comment_id, reply_id)}
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

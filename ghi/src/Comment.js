import React, { useState, useEffect } from "react";
import Reply from "./Reply";
import EditComment from "./EditComment";

function Comment({
  comment,
  username,
  post_id,
  reply_id,
  onCommentUpdated,
  startAddingReply,
  deleteReply,
  startEditingReply,
  editingReplyId,
}) {
  const [replies, setReplies] = useState([]);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/posts/${post_id}/comments/${comment.comment_id}/replies`
        );
        if (response.ok) {
          const data = await response.json();
          setReplies(data);
        } else {
          console.error("Failed to fetch replies");
        }
      } catch (error) {
        console.error("Error occurred during replies fetching: ", error);
      }
    };

    fetchReplies();
  }, [comment, post_id]);

  async function deleteComment(comment_id) {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post_id}/comments/${comment_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onCommentUpdated();
      } else {
        console.log("Error deleting comment");
      }
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  }

  const startEditingComment = (comment_id) => {
    if (editingComment === comment_id) {
      setEditingComment(null);
    } else {
      setEditingComment(comment_id);
    }
  };

  return (
    <div key={comment.comment_id} className="card w-100 mb-4">
      <div className="card-body p-4 d-flex justify-content-between align-items-start">
        <div>
          <h5>
            <strong>{username} says:</strong>
          </h5>
          <p className="h5">{comment.comment}</p>
        </div>
        <div className="text-right ml-auto">
          <small className="text-muted">
            Posted on: {new Date(comment.created_on).toLocaleString()}
          </small>
          <div className="mt-2">
            {comment.username === username && (
              <>
                <button
                  className="btn btn-sm btn-outline-primary ml-2"
                  style={{
                    fontSize: "0.7rem",
                    padding: "2px 5px",
                  }}
                  onClick={() => startEditingComment(comment.comment_id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  style={{
                    fontSize: "0.7rem",
                    padding: "2px 5px",
                  }}
                  onClick={() => deleteComment(comment.comment_id)}
                >
                  Delete
                </button>
              </>
            )}
            <button
              className="btn btn-sm btn-outline-info ml-2"
              style={{ fontSize: "0.7rem", padding: "2px 5px" }}
              onClick={() => startAddingReply(comment.comment_id)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      {replies.map((reply) => (
        <Reply
          reply={reply}
          reply_id={reply_id}
          post_id={post_id}
          comment_id={comment.comment_id}
          deleteReply={deleteReply}
          startEditingReply={startEditingReply}
          editingReplyId={editingReplyId}
        />
      ))}
      {editingComment === comment.comment_id && (
        <EditComment
          post_id={post_id}
          comment_id={comment.comment_id}
          onCommentUpdated={() => {
            setEditingComment(null);
            onCommentUpdated();
          }}
        />
      )}
    </div>
  );
}

export default Comment;

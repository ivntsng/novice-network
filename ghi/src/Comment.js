import React, { useState, useContext } from "react";
import EditComment from "./EditComment";
import CreateReply from "./CreateReply";
import Reply from "./Reply";
import { UserContext } from "./UserContext";
import "./Comment.css";

function Comment({ comment, username, post_id, onCommentUpdated, replies }) {
  const [editingComment, setEditingComment] = useState(null);
  const [isAddingReply, setIsAddingReply] = useState(false);
  const { userData } = useContext(UserContext);

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

  const startAddingReply = () => {
    setIsAddingReply(!isAddingReply);
  };

  return (
    <div key={comment.comment_id} className="card w-100 mb-4">
      <div className="comment-card-body p-4 d-flex justify-content-between align-items-start">
        <div>
          <h5>
            <strong>{userData.username} says:</strong>
          </h5>
          <p className="h5">{comment.comment}</p>
        </div>
        <div className="text-right ml-auto">
          <small className="text-muted">
            Posted on: {new Date(comment.created_on).toLocaleString()}
          </small>
          <div className="mt-2" style={{ marginLeft: "auto" }}>
            {comment.username === username && (
              <>
                <button
                  className="btn btn-sm comment-btn-outline-primary ml-2"
                  style={{
                    fontSize: "0.7rem",
                    padding: "2px 5px",
                  }}
                  onClick={() => startEditingComment(comment.comment_id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm comment-btn-outline-danger"
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
              className="btn btn-sm comment-btn-outline-info ml-2"
              style={{ fontSize: "0.7rem", padding: "2px 5px" }}
              onClick={startAddingReply}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      {isAddingReply && (
        <CreateReply
          post_id={post_id}
          comment_id={comment.comment_id}
          onReplyCreated={() => {
            setIsAddingReply(false);
            onCommentUpdated();
          }}
        />
      )}
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
      {Array.isArray(replies) &&
        replies.map((reply) => (
          <Reply
            key={reply.reply_id}
            reply={reply}
            post_id={post_id}
            comment_id={comment.comment_id}
            fetchComments={onCommentUpdated}
            reply_id={null}
          />
        ))}
    </div>
  );
}
Comment.defaultProps = {
  replies: [],
};

export default Comment;

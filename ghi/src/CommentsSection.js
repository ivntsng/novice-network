import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import CreateReply from "./CreateReply";
import EditReply from "./EditReply"; // Make sure you have this component created
import Reply from "./Reply";

function CommentsSection({ post_id }) {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editingReply, setEditingReply] = useState(null);
  const [addingReplyTo, setAddingReplyTo] = useState(null);

  async function fetchComments() {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post_id}/comments`
      );
      if (response.ok) {
        const commentsData = await response.json();
        for (let comment of commentsData) {
          const repliesRes = await fetch(
            `http://localhost:8000/posts/${post_id}/comments/${comment.comment_id}/replies`
          );
          if (repliesRes.ok) {
            const repliesData = await repliesRes.json();
            comment.replies = repliesData;
          }
        }
        setComments(commentsData);
      } else {
        console.log("Error fetching comments");
      }
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  }

  async function deleteComment(comment_id) {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post_id}/comments/${comment_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchComments();
      } else {
        console.log("Error deleting comment");
      }
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  }

  async function deleteReply(comment_id, reply_id) {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`,
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

  const startEditingComment = (comment) => {
    if (editingComment && editingComment.comment_id === comment.comment_id) {
      setEditingComment(null);
    } else {
      setEditingComment({
        ...comment,
        post_id,
      });
    }
  };

  const startEditingReply = (reply) => {
    if (editingReply && editingReply.reply_id === reply.reply_id) {
      setEditingReply(null);
    } else {
      setEditingReply(reply);
    }
  };

  const stopEditingComment = () => {
    setEditingComment(null);
  };

  const stopEditingReply = () => {
    setEditingReply(null);
  };

  const startAddingReply = (comment) => {
    if (addingReplyTo && addingReplyTo.comment_id === comment.comment_id) {
      setAddingReplyTo(null);
    } else {
      setAddingReplyTo(comment);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (!comments) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="container my-5 py-5 text-dark">
        <div className="row d-flex justify-content-center">
          <div className="col-md-11 col-lg-9 col-xl-7">
            <div className="d-flex flex-column mb-4">
              <h4 className="mb-3">Comments</h4>
              {comments
                .sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
                .map((comment) => (
                  <div key={comment.comment_id} className="card w-100 mb-4">
                    <div className="card-body p-4 d-flex justify-content-between align-items-start">
                      <div>
                        <h5>
                          <strong>User {comment.user_id}:</strong>
                        </h5>
                        <p className="h5">{comment.comment}</p>
                      </div>
                      <div className="text-right ml-auto">
                        <small className="text-muted">
                          Posted on:{" "}
                          {new Date(comment.created_on).toLocaleString()}
                        </small>
                        <div className="mt-2">
                          <button
                            className="btn btn-sm btn-outline-primary ml-2"
                            style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                            onClick={() => startEditingComment(comment)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                            onClick={() => deleteComment(comment.comment_id)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-sm btn-outline-info ml-2"
                            style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                            onClick={() => startAddingReply(comment)}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                    {comment.replies &&
                      comment.replies.map((reply) => (
                        <Reply
                          reply={reply}
                          key={reply.reply_id}
                          deleteReply={() =>
                            deleteReply(comment.comment_id, reply.reply_id)
                          }
                          startEditingReply={() => startEditingReply(reply)}
                        />
                      ))}
                  </div>
                ))}
              {editingComment && (
                <EditComment
                  post_id={editingComment.post_id}
                  comment_id={editingComment.comment_id}
                  onCommentUpdated={stopEditingComment}
                />
              )}
              {editingReply && (
                <EditReply
                  post_id={post_id}
                  comment_id={editingReply.comment_id}
                  reply_id={editingReply.reply_id}
                  onReplyUpdated={stopEditingReply}
                />
              )}
              {addingReplyTo && (
                <CreateReply
                  post_id={post_id}
                  comment_id={addingReplyTo.comment_id}
                  onReplyCreated={fetchComments}
                />
              )}
            </div>
            <h5 className="mt-4">Add a Comment</h5>
            <CreateComment post_id={post_id} onCommentCreated={fetchComments} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;

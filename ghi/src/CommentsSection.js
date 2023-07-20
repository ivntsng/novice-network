import React, { useState, useEffect, useContext } from "react";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import CreateReply from "./CreateReply";
import EditReply from "./EditReply";
import Reply from "./Reply";
import { UserContext } from "./UserContext";

function CommentsSection({ post_id }) {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editingReply, setEditingReply] = useState(null);
  const [replyingToComment, setReplyingToComment] = useState(null);
  const { username } = useContext(UserContext);

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

  const startEditingComment = (comment_id) => {
    if (editingComment === comment_id) {
      setEditingComment(null);
    } else {
      setEditingComment(comment_id);
    }
  };

  const startEditingReply = (reply_id, comment_id) => {
    if (editingReply && editingReply.reply_id === reply_id) {
      setEditingReply({});
    } else {
      setEditingReply({ reply_id, comment_id });
    }
  };

  const startAddingReply = (comment) => {
    setReplyingToComment(comment.comment_id);
  };

  const onReplyCreated = () => {
    setReplyingToComment(null);
    fetchComments();
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
                          <strong>{comment.username} says:</strong>
                        </h5>
                        <p className="h5">{comment.comment}</p>
                      </div>
                      <div className="text-right ml-auto">
                        <small className="text-muted">
                          Posted on:{" "}
                          {new Date(comment.created_on).toLocaleString()}
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
                                onClick={() =>
                                  startEditingComment(comment.comment_id)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                style={{
                                  fontSize: "0.7rem",
                                  padding: "2px 5px",
                                }}
                                onClick={() =>
                                  deleteComment(comment.comment_id)
                                }
                              >
                                Delete
                              </button>
                            </>
                          )}
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
                          startEditingReply={() =>
                            startEditingReply(
                              reply.reply_id,
                              comment.comment_id
                            )
                          }
                        />
                      ))}
                    {editingReply &&
                      editingReply.comment_id === comment.comment_id && (
                        <EditReply
                          post_id={post_id}
                          comment_id={editingReply.comment_id}
                          reply_id={editingReply.reply_id}
                          onReplyUpdated={fetchComments}
                        />
                      )}
                    {editingComment === comment.comment_id && (
                      <EditComment
                        post_id={post_id}
                        comment_id={editingComment}
                        onCommentUpdated={fetchComments}
                      />
                    )}
                    {replyingToComment === comment.comment_id && (
                      <CreateReply
                        post_id={post_id}
                        comment_id={comment.comment_id}
                        onReplyCreated={onReplyCreated}
                      />
                    )}
                  </div>
                ))}
              <h5 className="mt-4">Add a Comment</h5>
              <CreateComment
                post_id={post_id}
                onCommentCreated={fetchComments}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;

import React, { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import CreateReply from "./CreateReply";
import EditReply from "./EditReply";
import { UserContext } from "./UserContext";

function CommentsSection({ post_id }) {
  const [comments, setComments] = useState([]);
  const [addingReplyTo, setAddingReplyTo] = useState(null);
  const [editingReply, setEditingReply] = useState(null);
  const { username } = useContext(UserContext);

  async function fetchComments() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/posts/${post_id}/comments`
      );
      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      } else {
        console.log("Error fetching comments");
      }
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  }

  const deleteReply = async (comment_id, reply_id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Reply deleted");
        fetchComments();
      } else {
        console.log("Error deleting reply");
      }
    } catch (error) {
      console.log("Error deleting reply:", error);
    }
  };

  const startEditingReply = (comment_id, reply_id, reply) => {
    if (editingReply && editingReply.reply_id === reply_id) {
      setEditingReply(null);
    } else {
      setEditingReply({ comment_id, reply_id, reply });
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAddingReply = (comment_id) => {
    setAddingReplyTo(comment_id);
  };

  const onReplyCreated = () => {
    setAddingReplyTo(null);
    fetchComments();
  };

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
              {comments && comments.length > 0 ? (
                comments
                  .sort(
                    (a, b) => new Date(b.created_on) - new Date(a.created_on)
                  )
                  .map((comment) => (
                    <div key={comment.comment_id}>
                      <Comment
                        comment={comment}
                        username={username}
                        post_id={post_id}
                        onCommentUpdated={fetchComments}
                        startAddingReply={startAddingReply}
                        deleteReply={deleteReply}
                        startEditingReply={startEditingReply}
                      />
                      {addingReplyTo === comment.comment_id && (
                        <CreateReply
                          post_id={post_id}
                          comment_id={comment.comment_id}
                          onReplyCreated={onReplyCreated}
                        />
                      )}
                    </div>
                  ))
              ) : (
                <p>No comments yet. Be the first one!</p>
              )}
              <h5 className="mt-4">Add a Comment</h5>
              <CreateComment
                post_id={post_id}
                onCommentCreated={fetchComments}
              />
              {editingReply && (
                <EditReply
                  post_id={post_id}
                  reply_id={editingReply.reply_id}
                  reply={editingReply.reply}
                  onReplyUpdated={() => {
                    setEditingReply(null);
                    fetchComments();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;

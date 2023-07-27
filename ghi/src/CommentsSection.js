import React, { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import Reply from "./Reply";
import { UserContext } from "./UserContext";
import "./CommentsSection.css";

function CommentsSection({ post_id }) {
  const [comments, setComments] = useState([]);
  const { username } = useContext(UserContext);

  async function fetchComments() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/posts/${post_id}/comments`
      );
      if (response.ok) {
        const commentsData = await response.json();

        const updatedCommentsData = await Promise.all(
          commentsData.map(async (comment) => {
            const replyResponse = await fetch(
              `${process.env.REACT_APP_API_HOST}/posts/${post_id}/comments/${comment.comment_id}/replies`
            );
            if (replyResponse.ok) {
              const repliesData = await replyResponse.json();
              return { ...comment, replies: repliesData };
            }
            return comment;
          })
        );

        if (JSON.stringify(comments) !== JSON.stringify(updatedCommentsData)) {
          setComments(updatedCommentsData);
        }
      } else {
        console.log("Error fetching comments");
        setComments([]);
      }
    } catch (error) {
      console.log("Error fetching comments:", error);
      setComments([]);
    }
  }

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!comments) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="comments-section-container my-5 py-5 text-dark">
        <div className="row d-flex justify-content-center">
          <div className="col-md-11 col-lg-9 col-xl-7">
            <div className="d-flex flex-column mb-4">
              <h3 className="mb-3">Comments</h3>
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
                      />
                      {comment.replies &&
                        comment.replies.map((reply) => (
                          <Reply
                            key={reply.reply_id}
                            reply={reply}
                            post_id={post_id}
                            comment_id={comment.comment_id}
                            fetchComments={fetchComments}
                          />
                        ))}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;

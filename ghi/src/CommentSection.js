import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";

function CommentsSection({ post_id }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/comments/${post_id}`);
      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      } else {
        console.log("Error fetching comments");
      }
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post_id]);

  const addNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      <h5>Comments</h5>
      {comments.map((comment) => (
        <div key={comment.comment_id}>
          <strong>User {comment.user_id}:</strong>
          <span>{comment.comment}</span>
        </div>
      ))}
      <h5>Add a Comment</h5>
      <CreateComment post_id={post_id} onAddComment={addNewComment} />
    </div>
  );
}

export default CommentsSection;

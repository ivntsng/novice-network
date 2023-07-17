import React, { useState } from "react";

function CreateComment({ post_id, onAddComment }) {
  const [newComment, setNewComment] = useState("");

  const addComment = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          post_id,
          comment: newComment,
        }),
      });

      if (response.ok) {
        const commentData = await response.json();
        onAddComment(commentData);
        setNewComment("");
      } else {
        console.log("Error adding comment");
      }
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={addComment}>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Type your comment here"
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CreateComment;

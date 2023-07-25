import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

const CreateComment = ({ post_id, onCommentCreated }) => {
  const [newComment, setnewComment] = useState("");
  const { userData } = useContext(UserContext); // Extract userData from UserContext
  const username = userData.username; // Extract username from userData
  console.log(username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      post_id,
      owner_username: username,
      comment: newComment,
    };

    console.log("post_id:", post_id);
    console.log("username:", username);

    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/posts/${post_id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      }
    );

    if (response.ok) {
      setnewComment("");
      if (onCommentCreated) onCommentCreated();
    } else {
      console.log("Error creating comment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="form-control"
        value={newComment}
        onChange={(e) => setnewComment(e.target.value)}
        placeholder="Your Comment"
        required
      />
      <button className="btn btn-primary mt-2">Submit Comment</button>
    </form>
  );
};

export default CreateComment;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function EditComment({ post_id, comment_id, onCommentUpdated }) {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const handleCommentChange = (event) => setComment(event.target.value);

  useEffect(() => {
    const fetchCommentDetails = async () => {
      if (post_id && comment_id) {
        const response = await fetch(
          `http://localhost:8000/posts/${post_id}/comments/${comment_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setComment(data.comment);
        } else {
          console.error("Error fetching comment details");
        }
      } else {
        console.error("'post_id' or 'comment_id' is undefined");
      }
    };
    fetchCommentDetails();
  }, [post_id, comment_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userData || !userData.username) {
      console.error("userData or userData.username is undefined");
      return;
    }

    const commentData = {
      post_id,
      owner_username: userData.username,
      comment,
      created_on: new Date().toISOString(),
    };

    const commentIdAsInteger = parseInt(comment_id, 10);
    if (isNaN(commentIdAsInteger)) {
      console.error("comment_id is not a valid integer:", comment_id);
      return;
    }

    const response = await fetch(
      `http://localhost:8000/posts/${post_id}/comments/${commentIdAsInteger}`,
      {
        method: "PUT",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      await response.json();
      setComment("");
      onCommentUpdated();
      navigate(`/posts/${post_id}`);
    } else {
      const errorMessage = await response.text();
      console.error(
        `Error status: ${response.status}, message: ${errorMessage}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} id="edit-comment-form">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Edit Comment</h1>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleCommentChange}
                value={comment}
                placeholder="Comment"
                type="text"
                name="comment"
                id="comment"
                className="form-control"
                rows="4"
                required
              />
              <label htmlFor="comment">Comment</label>
            </div>
            <div className="text-center">
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditComment;

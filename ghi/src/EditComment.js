import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditComment({ post_id, comment_id, onCommentUpdated }) {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCommentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchCommentDetails() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/posts/${post_id}/comments/${comment_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setComment(data.comment);
      } else {
        console.error("Failed to fetch comment details");
      }
    } catch (error) {
      console.error("Error occurred during comment details fetching: ", error);
    }
  }

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      comment: comment,
    };

    const editUrl = `${process.env.REACT_APP_API_HOST}/posts/${post_id}/comments/${comment_id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(editUrl, fetchConfig);
      if (response.ok) {
        if (onCommentUpdated) {
          onCommentUpdated();
        }

        navigate(`/posts/${post_id}/comments/${comment_id}`);
      } else {
        console.error("There was an error updating the comment.");
      }
    } catch (e) {
      console.log("There was an error: ", e);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Edit Comment</h1>
          <form onSubmit={handleSubmit} id="edit-comment-form">
            <div className="form-floating mb-3">
              <textarea
                onChange={handleCommentChange}
                value={comment}
                placeholder="comment"
                required
                type="text"
                id="comment"
                className="form-control"
                rows="4"
              />
              <label htmlFor="comment">Comment</label>
            </div>
            <button className="btn btn-primary" type="submit">
              Update Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

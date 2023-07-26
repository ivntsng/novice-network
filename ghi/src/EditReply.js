import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function EditReply({
  post_id,
  comment_id,
  reply_id,
  onReplyUpdated,
}) {
  const [reply, setReply] = useState("");
  const [replyDetails, setReplyDetails] = useState(null);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchReplyDetails = async () => {
    const response = await fetch(
      `http://localhost:8000/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`
    );
    if (response.ok) {
      const data = await response.json();
      setReplyDetails(data);
      setReply(data.reply);
      console.log("comment_id", comment_id);
    } else {
      console.error("Error fetching reply details");
    }
  };

  useEffect(() => {
    fetchReplyDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_id, comment_id, reply_id]);

  const handleReplyChange = (event) => setReply(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!replyDetails) {
      console.error("No reply details available");
      return;
    }

    const { post_id, comment_id } = replyDetails;

    const replyData = {
      post_id,
      comment_id,
      owner_username: userData.username,
      reply,
      reply_id,
      created_on: new Date().toISOString(),
    };

    const response = await fetch(
      `http://localhost:8000/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`,
      {
        method: "PUT",
        body: JSON.stringify(replyData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      await response.json();
      onReplyUpdated();
      navigate(`/posts/${post_id}/`);
    } else {
      const errorMessage = await response.text();
      console.error(
        `Error status: ${response.status}, message: ${errorMessage}`
      );
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Edit Reply</h1>
          <form onSubmit={handleSubmit} id="edit-reply-form">
            <div className="form-floating mb-3">
              <textarea
                onChange={handleReplyChange}
                value={reply}
                placeholder="Reply"
                type="text"
                name="reply"
                id="reply"
                className="form-control"
                rows="4"
                required
              />
              <label htmlFor="reply">Reply</label>
            </div>
            <div className="text-center">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

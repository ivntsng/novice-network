import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";

function PostEdit({ getPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [setCreatedDateTime] = useState("");
  const [setOwnerId] = useState("");
  const navigate = useNavigate();
  const { post_id } = useParams();
  const [setPost] = useState(null);
  const { userData } = useContext(UserContext);

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/posts/${post_id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
          setCreatedDateTime(data.created_datetime);
          setOwnerId(data.owner_id);
          setPost(data);
        } else {
          console.log("Error fetching post details");
        }
      } catch (error) {
        console.log("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [post_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = {};

    formdata.title = title;
    formdata.description = description;
    formdata.created_datetime = new Date().toISOString();
    formdata.owner_username = userData.username; // after auth is done will be Use the ownerId prop received from the backend

    const postUrl = `http://localhost:8000/posts/${post_id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(postUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setTitle("");
      setDescription("");
      setCreatedDateTime("");
      getPosts();
      navigate(`/posts/${post_id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="add-posts-form">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Write a post</h1>
            <div className="form-floating mb-3">
              <input
                onChange={handleTitleChange}
                value={title}
                placeholder="Title"
                type="text"
                name="title"
                id="title"
                className="form-control"
                required
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleDescriptionChange}
                value={description}
                placeholder="Description"
                type="text"
                name="description"
                id="description"
                className="form-control"
                style={{ minHeight: "300px" }}
                required
              />
              <label htmlFor="description">Description</label>
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

export default PostEdit;

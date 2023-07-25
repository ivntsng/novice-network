import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function PostForm({ getPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = {};

    formdata.title = title;
    formdata.description = description;
    formdata.created_datetime = new Date().toISOString();
    formdata.owner_username = userData.username;
    const postUrl = `${process.env.REACT_APP_API_HOST}/posts`;
    const fetchConfig = {
      method: "POST",
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
      getPosts();
      navigate("/posts");
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

export default PostForm;

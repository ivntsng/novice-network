import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PostForm({ getPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [CreatedDateTime, setCreatedDateTime] = useState("");
  const [OwnerId, setOwnerId] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleOwnerIdChange = (event) => {
    const value = event.target.value;
    setOwnerId(value);
  };

  const fetchUserData = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.account);
        setUserData(data);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = {};

    formdata.title = title;
    formdata.description = description;
    formdata.created_datetime = new Date().toISOString();
    formdata.owner_id = OwnerId; // after auth is done will be Use the ownerId prop received from the backend

        const postUrl = 'http://localhost:8000/posts/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(formdata),
          headers: {
            'Content-Type': 'application/json',
          }
        }

        const response = await fetch(postUrl, fetchConfig);
        if (response.ok) {
          const newPosts = await response.json();
          setTitle('');
          setDescription('');
          setCreatedDateTime('');
          setOwnerId('');
          getPosts();
          navigate('/posts');
        }
    }

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
            <div className="form-floating mb-3">
              <input
                onChange={handleOwnerIdChange}
                value={OwnerId}
                placeholder="Owner Id"
                type="number"
                name="ownerid"
                id="ownerid"
                className="form-control"
                required
              />
              <label htmlFor="ownerid">Owner ID</label>
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

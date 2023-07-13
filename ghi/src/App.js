import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import MainPage from "./MainPage.js";
import ListJobs from "./ListJobs.js";
import CreateJob from "./CreateJobs";
import JobDetail from "./JobDetail";
import PostList from "./PostList";
import PostForm from "./PostForm";
import PostDetail from "./PostDetail";
import CreateUser from "./Signup.js";

function App() {
  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentJobId, setCurrentJobId] = useState(null);

  async function getJobs() {
    const jobsUrl = "http://localhost:8000/jobs/";
    const response = await fetch(jobsUrl);
    if (response.ok) {
      const data = await response.json();
      setJobs(data);
    }
  }

  async function getPosts() {
    const postsUrl = "http://localhost:8000/posts/";
    const response = await fetch(postsUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setPosts(data);
    }
  }

  const [users, setUsers] = useState([]);

  async function getUsers() {
    const usersUrl = "http://localhost:8000/users/";
    const response = await fetch(usersUrl);
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  }

  useEffect(() => {
    getJobs();
    getPosts();
    getUsers();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="jobs">
            <Route index element={<ListJobs listJobs={jobs} />} />
            <Route path="create" element={<CreateJob getJobs={getJobs} />} />
          </Route>
          <Route path="/jobs/:jobs_id">
            <Route index element={<JobDetail listJobs={jobs} />} />
          </Route>
          <Route path="posts">
            <Route
              index
              element={<PostList posts={posts} getPosts={getPosts} />}
            />
            <Route
              path="create"
              element={<PostForm posts={posts} getPosts={getPosts} />}
            />
          </Route>
          <Route path="post/:id">
            <Route
              index
              element={<PostDetail posts={posts} getPosts={getPosts} />}
            />
          </Route>
          <Route path="signup" element={<CreateUser />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

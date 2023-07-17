import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import Nav from "./Nav";
import MainPage from "./MainPage";
import ListJobs from "./ListJobs";
import CreateJob from "./CreateJobs";
import JobDetail from "./JobDetail";
import PostList from "./PostList";
import PostForm from "./PostForm";
import PostDetail from "./PostDetail";
import CreateUser from "./Signup";
import DeleteJob from "./DeleteJob";
import EditJob from "./EditJob";

function App() {
  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [deleteJobId, setDeleteJobId] = useState(null);

  async function getJobs() {
    try {
      const response = await fetch("http://localhost:8000/jobs/");
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error occurred during job fetching: ", error);
    }
  }

  async function getPosts() {
    try {
      const response = await fetch("http://localhost:8000/posts/");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error occurred during post fetching: ", error);
    }
  }

  useEffect(() => {
    getJobs();
    getPosts();
    setCurrentJobId(currentJobId);
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav setCurrentJobId={setCurrentJobId} />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/jobs" element={<ListJobs listJobs={jobs} />} />
            <Route
              path="/jobs/create"
              element={<CreateJob getJobs={getJobs} />}
            />
            <Route
              path="/jobs/:jobs_id"
              element={
                <JobDetail listJobs={jobs} setCurrentJobId={setCurrentJobId} />
              }
            />
            <Route
              path="/jobs/:jobs_id/delete"
              element={
                <DeleteJob currentJobId={currentJobId} getJobs={getJobs} />
              }
            />
            <Route
              path="/jobs/:jobs_id/edit"
              element={
                <EditJob currentJobId={currentJobId} getJobs={getJobs} />
              }
            />
            <Route
              path="/posts"
              element={<PostList posts={posts} getPosts={getPosts} />}
            />
            <Route
              path="/posts/create"
              element={<PostForm posts={posts} getPosts={getPosts} />}
            />
            <Route
              path="/posts/:post_id"
              element={<PostDetail posts={posts} getPosts={getPosts} />}
            />
            <Route path="/signup" element={<CreateUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

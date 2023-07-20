import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider, useAuthContext } from "@galvanize-inc/jwtdown-for-react";
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
import LoginPage from "./Login";
import PostEdit from "./PostEdit";
import UserProfile from "./UserProfile";
import Logout from "./Logout";
import { UserContext } from "./UserContext";

function App() {
  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentJobId, setCurrentJobId] = useState(null);
  const { isAuthenticated, user, token } = useAuthContext();
  const [userData, setUserData] = useState(UserContext);

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

  const handleUserData = async () => {
    try {
      const url = `${process.env.REACT_APP_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const { id, username, email, role } = data.account;
        setUserData({
          id,
          username,
          email,
          role,
        });
      } else {
        // Handle error
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      // Handle error
      return;
    }
  };

  useEffect(() => {
    getJobs();
    getPosts();
    setCurrentJobId(currentJobId);
    handleUserData();
  }, []);

  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <UserContext.Provider value={{ userData, setUserData }}>
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
                  <JobDetail
                    listJobs={jobs}
                    setCurrentJobId={setCurrentJobId}
                  />
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
                path="/posts/:post_id/"
                element={
                  <PostDetail
                    posts={posts}
                    getPosts={getPosts}
                    userData={userData}
                  />
                }
              />
              <Route
                path="/posts/:post_id/edit"
                element={<PostEdit posts={posts} getPosts={getPosts} />}
              />
              <Route path="/signup" element={<CreateUser />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/users/:username"
                element={<UserProfile posts={posts} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </AuthProvider>
  );
}

export default App;

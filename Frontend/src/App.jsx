import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Home/Homepage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Repository from "./components/repository/Repository";
import Dashboard from "./components/Dashboard/Dashboard";
import Commits from "./components/Commits/Commits";
import DisplayCommit from "./components/Commits/DisplayCommit";
import Explore from "./components/Explore/Explore";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "./components/Explore/UserProfile";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/user/:userId" element={<UserProfile />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/repository/:repoId" element={<Repository />} />
          <Route path="/commits/:repoId" element={<Commits />} />
          <Route path="/commit/:commitId" element={<DisplayCommit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

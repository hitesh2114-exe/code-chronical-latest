import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Home/Homepage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Repository from "./components/repository/Repository";
import Dashboard from "./components/Dashboard/Dashboard";
import Commits from "./components/Commits/Commits";
import DisplayCommit from "./components/Commits/DisplayCommit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/repository/:repoId" element={<Repository />} />
          <Route path="/commits/:repoId" element={<Commits />} />
          <Route path="/commit/:commitId" element={<DisplayCommit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

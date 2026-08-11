import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './Commits.css'

function Commits() {
  const { repoId } = useParams();
  const token = localStorage.getItem("token");
  const [repo, setRepo] = useState({});
  const [commits, setCommits] = useState([]);
  const navigate = useNavigate();

  const fetchRepo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/repositories/${repoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRepo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCommits = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/commits/${repoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommits(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRepo();
    getAllCommits();
  }, []);

  useEffect(() => {
    console.log(repo);
    console.log(commits);
  }, [repo, commits]);

  return (
    <div className="commits-page">
      <div className="repo-header">
        <h1>{repo.name}</h1>

        <p>{repo.description}</p>

        <div className="repo-meta">
          <span>{repo.visibility}</span>

          <span>{commits.length} Commits</span>
        </div>
      </div>

      <div className="commit-section-title">Commit History</div>

      {commits.length === 0 ? (
        <div className="empty">
          <h2>No commits found</h2>

          <p>Make your first commit to see it here.</p>
        </div>
      ) : (
        <div className="timeline">
          {commits.map((commit) => (
            <div className="commit-item" key={commit._id}>
              <div className="commit-dot"></div>

              <div className="commit-card">
                <div className="commit-message">{commit.message}</div>

                <div className="commit-id">{commit.commitId}</div>

                <div className="commit-date">
                  {new Date(commit.committedAt).toLocaleString()}
                </div>

                <Link className="view-btn" to={`/commit/${commit._id}`}>
                  View Files
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Commits;

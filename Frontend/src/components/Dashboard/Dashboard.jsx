import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Dashboard.css";
import Link from "@mui/material/Link";

function Dashboard() {
  const [user, setUser] = useState({});
  const [repo, setRepo] = useState([]);
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getRepo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/repositories/my",
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

    getUser();
    getRepo();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(repo);
  }, [repo]);

  return (
    <>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div className="welcome">
            <h1>Welcome back, {user.username}</h1>
            <p>Keep building. Keep committing.</p>
          </div>

          <button className="new-repo-btn">+ New Repository</button>
        </div>

        <div className="user-card">
          <h2>{user.username}</h2>

          <p>{user.email}</p>

          <p>{user.bio || "No bio added yet."}</p>
        </div>

        <div className="repo-section-title">
          <h2>Your Repositories</h2>
        </div>

        {repo.length === 0 ? (
          <div className="empty">
            <h2>No repositories found</h2>

            <p>Create your first repository and start committing.</p>
          </div>
        ) : (
          <div className="repo-grid">
            {repo.map((repository) => {
              return (
                <div className="repo-card" key={repository._id} onClick={() => {
                  navigate(`/repository/${repository._id}`)
                }}>
                  <div>
                    <div className="repo-name">📁 {repository.name}</div>

                    <div className="repo-description">
                      {repository.description}
                    </div>
                  </div>

                  <div className="repo-footer">
                    <span className="visibility">{repository.visibility}</span>

                    <span className="updated">
                      {new Date(repository.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;

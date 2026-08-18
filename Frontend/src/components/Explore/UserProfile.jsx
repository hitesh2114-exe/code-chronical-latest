import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../Commons/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import image1 from "../../public/image1.jpg";
import image2 from "../../public/image2.jpg";
import image3 from "../../public/image3.jpg";
import image4 from "../../public/image4.jpg";
import image5 from "../../public/image5.jpg";

import "./UserProfile.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function UserProfile() {
  const { userId } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const images = [image1, image2, image3, image4, image5];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/explore/${userId}`
      );
      const responseData = response.data.response;

      setRepositories(responseData.repositories);
      setUser(responseData.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  //   useEffect(() => {
  //     console.log(user);
  //   }, [user]);

  //   useEffect(() => {
  //     console.log(repositories);
  //   }, [repositories]);

  return (
    <>
      <NavBar />

      <div className="user-profile-page">
        <div className="user-profile-header">
          <div className="user-avatar">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <div className="user-profile-info">
            <h1>{user.username}</h1>

            <p>{user.bio || "No bio available."}</p>
          </div>
        </div>

        <div className="user-repositories">
          <div className="repositories-header">
            <h2>Repositories</h2>

            <span>
              {repositories.length}{" "}
              {repositories.length === 1 ? "repository" : "repositories"}
            </span>
          </div>

          {repositories.length === 0 ? (
            <div className="empty-repositories">
              <h3>No public repositories</h3>
              <p>This user hasn't created any public repositories yet.</p>
            </div>
          ) : (
            <div className="repository-grid">
              {repositories.map((repo, index) => (
                <Card className="profile-repository-card" key={repo._id}>
                  <CardMedia
                    component="img"
                    alt={repo.name}
                    height="140"
                    image={images[index % images.length]}
                  />

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="repo-card-title"
                    >
                      {repo.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="repo-card-description"
                    >
                      {repo.description || "No description provided."}
                    </Typography>

                    <Typography variant="body2" className="repo-card-updated">
                      Last updated: {new Date(repo.updatedAt).toLocaleString()}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/repository/${repo._id}`)}
                    >
                      See Repo
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;

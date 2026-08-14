import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Dashboard.css";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import NavBar from "../Commons/NavBar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

function Dashboard() {
  const [user, setUser] = useState({});
  const [repo, setRepo] = useState([]);
  const [open, setOpen] = useState(false);
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "public",
  });

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

  useEffect(() => {
    getUser();
    getRepo();
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  // useEffect(() => {
  //   console.log(repo);
  // }, [repo]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateRepository = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/repositories/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      console.log(response);
      handleClose();
      getRepo();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setFormData({
        name: "",
        description: "",
        visibility: "private",
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="dashboard-page">
        <div className="dashboard-header">
          {/* <Button variant="outlined">Outlined</Button> */}
          <div className="welcome">
            <h1>Welcome back, {user.username}</h1>
            <p>Keep building. Keep committing.</p>
          </div>

          <button className="new-repo-btn" onClick={handleOpen}>
            + New Repository
          </button>
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
                <div
                  className="repo-card"
                  key={repository._id}
                  onClick={() => {
                    navigate(`/repository/${repository._id}`);
                  }}
                >
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

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create Repository</DialogTitle>

        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Repository Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          {error && <p>{error}. Try again...</p>}

          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          {/* <FormControl margin="normal">
            <FormLabel>Visibility</FormLabel>

            <RadioGroup
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
            >
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />

              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
            </RadioGroup>
          </FormControl> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button variant="contained" onClick={handleCreateRepository}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dashboard;

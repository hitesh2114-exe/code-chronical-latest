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

import image1 from "../../public/image1.jpg";
import image2 from "../../public/image2.jpg";
import image3 from "../../public/image3.jpg";
import image4 from "../../public/image4.jpg";
import image5 from "../../public/image5.jpg";

import Typography from "@mui/material/Typography";

function Dashboard() {
  const [user, setUser] = useState({});
  const [repo, setRepo] = useState([]);
  const [open, setOpen] = useState(false);
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [repoSearch, setRepoSearch] = useState("");

  const images = [image1, image2, image3, image4, image5];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "public",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setDeletingAccount(true);

      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:8080/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setDeletingAccount(false);
      setDeleteDialogOpen(false);
    }
  };

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bio, setBio] = useState("");

  const filteredRepos = repo.filter((repository) => {
    const query = repoSearch.toLowerCase().trim();

    return (
      repository.name.toLowerCase().includes(query) ||
      repository.description?.toLowerCase().includes(query)
    );
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
      setBio(response?.data?.data.bio || "");
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

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/users/bio",
        {
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  console.log(response)
      setUser(response.data.response);
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

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
            <span className="welcome-kicker">YOUR WORKSPACE</span>
            <h1>Welcome back, {user.username}</h1>
            <p>Keep building. Keep committing.</p>
          </div>

          <button className="new-repo-btn" onClick={handleOpen} style={{backgroundColor : "green"}}>
            + New Repository
          </button>
        </div>

        <div className="dashboard-overview" aria-label="Repository overview">
          <div className="overview-item">
            <span>Repositories</span>
            <strong>{repo.length}</strong>
          </div>
          <div className="overview-item">
            <span>Public</span>
            <strong>
              {repo.filter((repository) => repository.visibility === "public").length}
            </strong>
          </div>
          <div className="overview-item">
            <span>Private</span>
            <strong>
              {repo.filter((repository) => repository.visibility === "private").length}
            </strong>
          </div>
        </div>

        <div className="user-card">
          <div className="user-avatar">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <div className="user-details">
            <div className="user-card-header">
              <div>
                <span className="profile-kicker">PROFILE</span>
                <h2>{user.username}</h2>
              </div>

              {!isEditingProfile && (
                <button
                  className="profile-edit-btn"
                  onClick={() => setIsEditingProfile(true)}
                >
                  Edit
                </button>
              )}
            </div>

            <p className="user-email">{user.email}</p>

            {isEditingProfile ? (
              <div className="profile-edit-area">
                <label>Bio</label>

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell something about yourself..."
                  maxLength={160}
                />

                <div className="profile-edit-actions">
                  <button
                    className="profile-cancel-btn"
                    onClick={() => {
                      setBio(user.bio || "");
                      setIsEditingProfile(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className="profile-save-btn"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <p className="user-bio">{user.bio || "No bio added yet."}</p>
            )}
          </div>
        </div>

        <div className="dashboard-search">
          <div className="dashboard-search-input">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search your repositories..."
              value={repoSearch}
              onChange={(e) => setRepoSearch(e.target.value)}
            />

            {repoSearch && (
              <button
                className="search-clear"
                onClick={() => setRepoSearch("")}
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="repo-section-title">
          <div>
            <span className="section-kicker">COLLECTION</span>
            <h2>Your Repositories</h2>
          </div>
          <span className="repo-count">{filteredRepos.length} total</span>
        </div>

        {filteredRepos.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📁</div>

            <h2>
              {repo.length === 0
                ? "No repositories yet"
                : "No repositories found"}
            </h2>

            <p>
              {repo.length === 0
                ? "Create your first repository and start committing."
                : "Try searching with a different keyword."}
            </p>

            {repo.length === 0 && (
              <button className="empty-create-btn" onClick={handleOpen}>
                + Create Repository
              </button>
            )}
          </div>
        ) : (
          <div className="repo-grid">
            {filteredRepos.map((repository, index) => {
              return (
                <article
                  className="dashboard-repo-card"
                  key={repository._id}
                  onClick={() => {
                    navigate(`/repository/${repository._id}`);
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/repository/${repository._id}`);
                    }
                  }}
                >
                  <div className="repo-card-image-wrap">
                    <img
                      className="repo-card-image"
                      src={images[index % images.length]}
                      alt={repository.name}
                    />

                    <div className="repo-card-image-overlay" />

                    <div className="repo-card-top">
                      <span className="repo-type">REPOSITORY</span>

                      <span
                        className={`visibility-badge ${
                          repository.visibility === "private"
                            ? "private"
                            : "public"
                        }`}
                      >
                        <span className="visibility-dot" />
                        {repository.visibility}
                      </span>
                    </div>

                    <div className="repo-card-image-title">
                      <span className="repo-folder-icon">⌁</span>
                      <span>{repository.name}</span>
                    </div>
                  </div>

                  <div className="repo-card-body">
                    <p className="repo-card-description">
                      {repository.description || "No description provided."}
                    </p>

                    <div className="repo-card-footer">
                      <span className="repo-updated">
                        Updated{" "}
                        {new Date(repository.updatedAt).toLocaleDateString()}
                      </span>

                      <span className="repo-open">
                        Open
                        <span>↗</span>
                      </span>
                    </div>
                  </div>
                </article>
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

          <FormControl margin="normal">
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
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button variant="contained" onClick={handleCreateRepository}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <div className="danger-zone">
        <div className="danger-zone-content">
          <span className="danger-kicker">ACCOUNT SETTINGS</span>
          <h3>Delete Account</h3>

          <p>
            Permanently delete your account and all associated repositories.
          </p>
        </div>

        <button
          className="delete-account-btn"
          onClick={() => setDeleteDialogOpen(true)}
        >
          Delete Account
        </button>
      </div>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          if (!deletingAccount) {
            setDeleteDialogOpen(false);
          }
        }}
      >
        <DialogTitle>Delete your account?</DialogTitle>

        <DialogContent>
          <Typography>
            This will permanently delete your account, repositories, commits,
            and repository files. This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deletingAccount}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
            disabled={deletingAccount}
          >
            {deletingAccount ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dashboard;

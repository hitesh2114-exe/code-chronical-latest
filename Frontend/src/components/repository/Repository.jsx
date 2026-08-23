import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Repository.css";
import { Link } from "react-router-dom";
import NavBar from "../Commons/NavBar";
import { useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DialogContentText from "@mui/material/DialogContentText";

function Repository() {
  const navigate = useNavigate();
  const { repoId } = useParams();
  const [repo, setRepo] = useState({});
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [fileContent, setFileContent] = useState("");
  const token = localStorage.getItem("token");
  const folderInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]); //folders selected for uploading
  const [commitMessage, setCommitMessage] = useState(""); //stores commit message
  const [openCommitModal, setOpenCommitModal] = useState(false); //for the opening and closing of commit message box
  const [selectedUploadFiles, setSelectedUploadFiles] = useState([]); //files selected to be uploaded
  const [uploadType, setUploadType] = useState(""); //to check if file is selected or folder
  const [isUploading, setIsUploading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); //for deleting the repo
  const [deleteTarget, setDeleteTarget] = useState(null); //file or folder that actually needed to be deleted
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); //for deleting the files/folders

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(""); //stores the edited file content
  const [selectedFilePath, setSelectedFilePath] = useState(""); //stores the path of file that is being edited
  const [isSaving, setIsSaving] = useState(false);

  const isLoggedIn = !!token;
  const [currentUserId, setCurrentUserId] = useState(null);

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [updatingDescription, setUpdatingDescription] = useState(false);

  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false);
  const [newVisibility, setNewVisibility] = useState("");
  const [visibilityLoading, setVisibilityLoading] = useState(false);

  // const [filePath, setFilePath] = useState("");

  //used to get the current logged in user info
  const fetchCurrentUser = async () => {
    if (!token) return;

    try {
      const response = await axios.get("https://code-chronical-latest-backend.onrender.com/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentUserId(response.data.data._id);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }
  };

  //this function is used to get all files and folders from supabase
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}/files?path=${currentPath}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFiles(response.data || []);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setFiles([]);
    }
  };

  //this function is used to get the repo details
  const fetchRepo = async () => {
    try {
      const response = await axios.get(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRepo(response.data);
      setDescription(response.data.description || "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRepo();
    fetchFiles();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  //used to check for owner of repo
  const isOwner =
    currentUserId && repo?.owner?._id && currentUserId === repo?.owner?._id;

  //used to navigate back
  const goBack = () => {
    const parent = currentPath.split("/").slice(0, -1).join("/");
    setCurrentPath(parent);
  };

  //used to get the content of the file
  const openFile = async (path) => {
    try {
      setSelectedFilePath(path);
      const response = await axios.get(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}/file`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            path,
          },
        }
      );

      setFileContent(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFolderUpload = async (e) => {
    try {
      setUploadType("folder");
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      setOpenCommitModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilesUpload = (e) => {
    try {
      setUploadType("files");
      const files = Array.from(e.target.files);
      setSelectedUploadFiles(files);
      setOpenCommitModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFolderCommit = async () => {
    try {
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append("files", file);
        formData.append("paths", file.webkitRelativePath);
      });
      formData.append("currentPath", currentPath);
      formData.append("message", commitMessage);
      setIsUploading(true);

      for (const pair of formData.entries()) {
        console.log(pair[0], "=>", pair[1]);
      }

      const response = await axios.post(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      await fetchFiles();
      setIsUploading(false);
      setSelectedFiles([]);
      setCommitMessage("");
      setOpenCommitModal(false);
    } catch (err) {
      console.log(err);
      setIsUploading(false);
    }
  };

  const handleFilesCommit = async () => {
    try {
      const formData = new FormData();

      selectedUploadFiles.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("currentPath", currentPath);
      formData.append("message", commitMessage);
      setIsUploading(true);

      const response = await axios.post(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}/upload-files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      await fetchFiles();
      setIsUploading(false);
      setSelectedUploadFiles([]);
      setCommitMessage("");
      setOpenCommitModal(false);
    } catch (err) {
      console.log(err);
      setIsUploading(false);
    }
  };

  const handleDeleteRepository = async () => {
    try {
      const response = await axios.delete(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeleteDialogOpen(false);
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Failed to delete repository:", error);
    }
  };

  const handleDeleteFileOrFolder = async () => {
    try {
      const response = await axios.delete(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}/file`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            path: deleteTarget.path,
          },
        }
      );
      // console.log(response.data);
      setOpenDeleteDialog(false);
      await fetchFiles();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveFile = async () => {
    try {
      setIsSaving(true);
      const response = await axios.put(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}/file`,
        {
          path: selectedFilePath,
          content: editedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setFileContent(editedContent);
      setIsEditing(false);
      await fetchFiles();
    } catch (error) {
      console.error("Failed to update file:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateDescription = async () => {
    try {
      setUpdatingDescription(true);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}`,
        {
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRepo(response.data.response);
      setDescription(response.data.response.description || "");
      setIsEditingDescription(false);
    } catch (error) {
      console.error("Failed to update description:", error);
    } finally {
      setUpdatingDescription(false);
    }
  };

  const navigateToPath = (path) => {
    setCurrentPath(path);
    setSelectedFilePath(null);
    setFileContent("");
  };

  const handleVisibilityChange = async () => {
    try {
      setVisibilityLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `https://code-chronical-latest-backend.onrender.com/api/repositories/${repoId}/change-visibility`,
        {
          visibility: newVisibility,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRepo((prev) => ({
        ...prev,
        visibility: response.data.response.visibility,
      }));

      setVisibilityDialogOpen(false);
    } catch (err) {
      console.error(
        "Error changing visibility:",
        err.response?.data?.message || err.message
      );
    } finally {
      setVisibilityLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(repo);
  // }, [repo]);

  // useEffect(() => {
  //   console.log(files);
  // }, [files]);

  // useEffect(() => {
  //   console.log("path : ", currentPath);
  // }, [currentPath]);

  // useEffect(() => {
  //   console.log("content : ", fileContent);
  // }, [fileContent]);

  // useEffect(() => {
  //   console.log("current path : ", currentPath);
  // }, [currentPath]);

  return (
    <>
      <NavBar />
      <div className="repository-page">
        <div className="repository-header">
          <span className="repository-kicker">REPOSITORY OVERVIEW</span>
          <div className="repository-title">{repo.name}</div>

          <div className="repository-description-section">
            {isEditingDescription ? (
              <div className="description-editor">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description for your repository..."
                  maxLength={300}
                />

                <div className="description-actions">
                  <button
                    className="description-cancel-btn"
                    onClick={() => {
                      setDescription(repo.description || "");
                      setIsEditingDescription(false);
                    }}
                    disabled={updatingDescription}
                  >
                    Cancel
                  </button>

                  <button
                    className="description-save-btn"
                    onClick={handleUpdateDescription}
                    disabled={updatingDescription}
                  >
                    {updatingDescription ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="description-display">
                <p className="repository-description">
                  {repo.description || "No description provided."}
                </p>

                {isOwner && (
                  <button
                    className="description-edit-btn"
                    onClick={() => setIsEditingDescription(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="repository-info">
            <span>
              🌐 {repo.visibility}
              {isOwner && (
                <button
                  className="visibility-edit-btn"
                  onClick={() => {
                    setNewVisibility(
                      repo.visibility === "public" ? "private" : "public"
                    );
                    setVisibilityDialogOpen(true);
                  }}
                >
                  <EditOutlinedIcon fontSize="small" />
                </button>
              )}
            </span>
            <Dialog
              open={visibilityDialogOpen}
              onClose={() => {
                if (!visibilityLoading) {
                  setVisibilityDialogOpen(false);
                }
              }}
            >
              <DialogTitle>Change repository visibility?</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  {newVisibility === "public"
                    ? "This repository will become public and can be cloned by other users."
                    : "This repository will become private and only authorized users will be able to access it."}
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={() => setVisibilityDialogOpen(false)}
                  disabled={visibilityLoading}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={handleVisibilityChange}
                  disabled={visibilityLoading}
                >
                  {visibilityLoading ? "Updating..." : "Confirm"}
                </Button>
              </DialogActions>
            </Dialog>
            <span>
              Created :
              {repo.createdAt && new Date(repo.createdAt).toLocaleString()}
            </span>

            <span>
              Updated :
              {repo.updatedAt && new Date(repo.updatedAt).toLocaleString()}
            </span>

            <span>
              <Link to={`/commits/${repoId}`}>
                <p>commits</p>
              </Link>
            </span>
          </div>
        </div>

        <div className="repository-container">
          <div className="repository-sidebar">
            <div className="sidebar-header">Repository Explorer</div>

            <div className="repository-path">
              <span className="path-root" onClick={() => navigateToPath("")}>
                📁 {repo.name}
              </span>

              {currentPath &&
                currentPath.split("/").map((part, index, parts) => {
                  const path = parts.slice(0, index + 1).join("/");

                  return (
                    <React.Fragment key={path}>
                      <span className="path-separator">/</span>

                      <button
                        className="path-part"
                        onClick={() => navigateToPath(path)}
                      >
                        {part}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            {currentPath && (
              <div className="back-btn" onClick={goBack}>
                ⬅ Back
              </div>
            )}

            <div className="file-list">
              {files.length === 0 ? (
                <div className="empty-folder">📂 This folder is empty</div>
              ) : (
                files.map((file) => (
                  <div
                    key={file.path}
                    className="file-item"
                    onClick={() => {
                      if (file.type === "folder") {
                        setCurrentPath(file.path);
                      } else {
                        openFile(file.path);
                      }
                    }}
                  >
                    <span className="file-icon">
                      {file.type === "folder" ? "📁" : "📄"}
                    </span>

                    <span className="file-name">{file.name}</span>

                    {isOwner && file.name !== "commit.json" && (
                      <Button
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();

                          setDeleteTarget({
                            name: file.name,
                            path: file.path,
                            type: file.type,
                          });

                          setOpenDeleteDialog(true);
                        }}
                      >
                        🗑️
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="file-viewer">
            <div
              className="viewer-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="viewer-file-path">
                {selectedFilePath ? (
                  <>
                    <span className="viewer-file-icon">📄</span>

                    <span className="viewer-path">
                      {repo.name} / {selectedFilePath}
                    </span>
                  </>
                ) : (
                  <span className="viewer-placeholder">
                    Select a file to preview
                  </span>
                )}
              </div>
              {/* <span>{isEditing ? "Edit File" : "File Preview"}</span> */}

              {!isEditing &&
                isOwner &&
                selectedFilePath &&
                !selectedFilePath.endsWith("commit.json") && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setEditedContent(fileContent);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                )}
              {isEditing && (
                <div>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditedContent(fileContent);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    sx={{ ml: 1 }}
                    onClick={handleSaveFile}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>
              )}
            </div>

            {isEditing ? (
              <TextField
                fullWidth
                multiline
                minRows={20}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                sx={{
                  "& textarea": {
                    fontFamily: "monospace",
                    whiteSpace: "pre",
                    color: "whitesmoke",
                  },
                }}
              />
            ) : (
              <pre className="viewer-content">
                {fileContent || "Select a file to preview"}
              </pre>
            )}
          </div>
        </div>
        <Box
          sx={{ width: "50%", height: "5rem", backgroundColor: "aliceblue" }}
        >
          <Modal
            open={openCommitModal}
            onClose={() => setOpenCommitModal(false)}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Commit Changes
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Commit Message"
                placeholder="Describe your changes..."
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
              />
              <p>message is required*</p>

              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: "text.secondary",
                }}
              >
                {uploadType === "folder"
                  ? `${selectedFiles.length} file(s) selected`
                  : `${selectedUploadFiles.length} file(s) selected`}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setOpenCommitModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    if (uploadType === "folder") {
                      handleFolderCommit();
                    } else if (uploadType === "files") {
                      handleFilesCommit();
                    }
                  }}
                >
                  {isUploading ? "Uploading..." : "Commit"}
                </Button>
              </Box>
            </Box>
          </Modal>

          {isOwner && (
            <>
              <input
                ref={folderInputRef}
                type="file"
                webkitdirectory=""
                directory=""
                multiple
                hidden
                onChange={handleFolderUpload}
              />
              <Button
                variant="contained"
                onClick={() => folderInputRef.current.click()}
                style={{ backgroundColor: "green" }}
              >
                Upload Folder
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                onChange={handleFilesUpload}
              />

              <Button
                variant="contained"
                onClick={() => fileInputRef.current.click()}
                style={{ backgroundColor: "green" }}
              >
                Upload Files
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Repository
              </Button>
            </>
          )}
        </Box>
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Repository?</DialogTitle>

          <DialogContent>
            <Typography>
              Are you sure you want to delete this repository? This action
              cannot be undone.
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>

            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteRepository}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>
            Delete {deleteTarget?.type === "folder" ? "Folder" : "File"}?
          </DialogTitle>

          <DialogContent>
            <Typography>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>?
            </Typography>

            {deleteTarget?.type === "folder" && (
              <Typography sx={{ mt: 1 }} color="text.secondary">
                All files inside this folder will also be deleted.
              </Typography>
            )}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                setOpenDeleteDialog(false);
                setDeleteTarget(null);
              }}
            >
              Cancel
            </Button>

            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteFileOrFolder}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Repository;

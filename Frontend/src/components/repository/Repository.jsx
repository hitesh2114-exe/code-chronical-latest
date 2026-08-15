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

  //this function is used to get all files and folders from supabase
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/repositories/${repoId}/files?path=${currentPath}`,
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

  useEffect(() => {
    fetchRepo();
    fetchFiles();
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  //used to navigate back
  const goBack = () => {
    const parent = currentPath.split("/").slice(0, -1).join("/");
    setCurrentPath(parent);
  };

  //used to get the content of the file
  const openFile = async (path) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/repositories/${repoId}/file`,
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
        `http://localhost:8080/api/repositories/${repoId}/upload`,
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
        `http://localhost:8080/api/repositories/${repoId}/upload-files`,
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
        `http://localhost:8080/api/repositories/${repoId}`,
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
        `http://localhost:8080/api/repositories/${repoId}/file`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            path: deleteTarget.path,
          },
        }
      );
      console.log(response.data);
      setOpenDeleteDialog(false);
      await fetchFiles();
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   console.log(repo);
  // }, [repo]);

  // useEffect(() => {
  //   console.log(files);
  // }, [files]);

  useEffect(() => {
    console.log("path : ", currentPath);
  }, [currentPath]);

  // useEffect(() => {
  //   console.log("content : ", fileContent);
  // }, [fileContent]);

  return (
    <>
      <NavBar />
      <div className="repository-page">
        <div className="repository-header">
          <div className="repository-title">{repo.name}</div>

          <div className="repository-description">{repo.description}</div>

          <div className="repository-info">
            <span>🌐 {repo.visibility}</span>
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
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="file-viewer">
            <div className="viewer-header">File Preview</div>

            <pre className="viewer-content">
              {fileContent || "Select a file to preview"}
            </pre>
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

import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import "./Repository.css";
import { Link } from "react-router-dom";

function Repository() {
  const { repoId } = useParams();
  const [repo, setRepo] = useState({});
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [fileContent, setFileContent] = useState("");
  const token = localStorage.getItem("token");

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
      setFiles(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const goBack = () => {
    const parent = currentPath.split("/").slice(0, -1).join("/");
    setCurrentPath(parent);
  };

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

  useEffect(() => {
    fetchRepo();
    fetchFiles();
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  // useEffect(() => {
  //   console.log(repo);
  // }, [repo]);

  // useEffect(() => {
  //   console.log(files);
  // }, [files]);

  // useEffect(() => {
  //   console.log("path : ", currentPath);
  // }, [currentPath]);

  useEffect(() => {
    console.log("content : ", fileContent);
  }, [fileContent]);

  return (
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
            {files.map((file) => (
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
              </div>
            ))}
          </div>
        </div>

        <div className="file-viewer">
          <div className="viewer-header">File Preview</div>

          <pre className="viewer-content">
            {fileContent || "Select a file to preview"}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Repository;

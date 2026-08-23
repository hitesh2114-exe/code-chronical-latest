import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./DisplayCommit.css";
import NavBar from "../Commons/NavBar";

function DisplayCommit() {
  const { commitId } = useParams();
  const token = localStorage.getItem("token");
  const [commitFile, setCommitFile] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [fileContent, setFileContent] = useState("");

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `https://code-chronical-latest-backend.onrender.com/api/commits/get/${commitId}/?path=${currentPath}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommitFile(response.data);
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
      console.log("current path : ", path);
      const response = await axios.get(
        `https://code-chronical-latest-backend.onrender.com/api/commits/get/${commitId}/file/?path=${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);
      setFileContent(response.data.response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    console.log(commitFile);
  }, [commitFile]);

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  // useEffect(() => {
  //   console.log(fileContent);
  // }, [fileContent]);

  return (
    <>
      <NavBar />
      <div className="display-commit-page">
        <div className="commit-header">
          <span className="commit-kicker">HISTORICAL SNAPSHOT</span>
          <h1>Commit Snapshot</h1>

          <p>Browse files exactly as they existed in this commit.</p>
        </div>

        <div className="commit-layout">
          <div className="commit-sidebar">
            <div className="sidebar-title">Commit Explorer</div>

            {currentPath && (
              <div className="back-btn" onClick={goBack}>
                ⬅ Back
              </div>
            )}

            <div className="file-list">
              {commitFile.map((file) => (
                <div
                  className="file-item"
                  key={file.path}
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

                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="commit-viewer">
            <div className="viewer-title">File Preview</div>

            <pre className="viewer-content">
              {fileContent || "Select a file from the explorer."}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayCommit;

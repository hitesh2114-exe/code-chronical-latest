import React from "react";
import Box from "@mui/material/Box";
import "./About.css";

function About() {
  return (
    <Box className="about-section">
      <div className="about-container">
        {/* Left Content */}
        <div className="about-content">
          <span className="about-label">ABOUT CODE CHRONICLE</span>

          <h2>
            A lightweight approach to <span>version control.</span>
          </h2>

          <p>
            Code Chronicle is a lightweight version control system for managing
            repositories, tracking changes, and maintaining code history.
          </p>

          <p>
            It combines a web interface for exploring repositories and commits
            with a command-line interface for working directly with local
            projects.
          </p>

          <div className="about-points">
            <div className="about-point">
              <span className="point-number">01</span>
              <span>Repository Management</span>
            </div>

            <div className="about-point">
              <span className="point-number">02</span>
              <span>Version History</span>
            </div>

            <div className="about-point">
              <span className="point-number">03</span>
              <span>Command Line Workflow</span>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="about-visual">
          <div className="version-card">
            {/* Repository Header */}
            <div className="version-header">
              <div>
                <span className="version-title">REPOSITORY</span>
                <span className="version-name">code-chronicle</span>
              </div>

              <span className="version-branch">main</span>
            </div>

            {/* Commit History */}
            <div className="commit-history">
              <div className="history-line"></div>

              <div className="commit">
                <div className="commit-info">
                  <strong>Initial repository</strong>
                  <span>8f42c1a · 2 days ago</span>
                </div>
              </div>

              <div className="commit">
                <div className="commit-info">
                  <strong>Added repository management</strong>
                  <span>299169a · 1 day ago</span>
                </div>
              </div>

              <div className="commit">
                <div className="commit-info">
                  <strong>Added CLI commands</strong>
                  <span>6a83e64 · now</span>
                </div>
              </div>
            </div>

            {/* File Preview */}
            <div className="file-preview">
              <div className="file-header">
                <span>FILES</span>
                <span>3 changed</span>
              </div>

              <div className="file">
                <span className="file-symbol">+</span>
                <span>src/index.js</span>
              </div>

              <div className="file">
                <span className="file-symbol">+</span>
                <span>src/commands/commit.js</span>
              </div>

              <div className="file">
                <span className="file-symbol modified">~</span>
                <span>README.md</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default About;

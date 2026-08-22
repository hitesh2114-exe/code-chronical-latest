import React from "react";
import { Link } from "react-router-dom";
import "./Documentation.css";

function Documentation() {
  return (
    <section className="documentation-section">
      <div className="documentation-container">
        <div className="documentation-content">
          <span className="documentation-label">GETTING STARTED</span>

          <h2>
            Everything you need to
            <span> get started.</span>
          </h2>

          <p>
            Learn how to install Code Chronicle, create your first repository,
            and work with the CLI commands.
          </p>
        </div>

        <div className="documentation-action">
          <Link to="/documentation" className="documentation-button">
            <span>Read Documentation</span>
            <span className="documentation-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Documentation;
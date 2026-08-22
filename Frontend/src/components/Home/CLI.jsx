import React from "react";
import "./CLI.css";

function CLI() {
  return (
    <section className="cli-section">
      <div className="cli-container">
        {/* Left Content */}
        <div className="cli-content">
          <span className="cli-label">CODE CHRONICLE CLI</span>

          <h2>
            Work directly from the <span>terminal.</span>
          </h2>

          <p>
            The Code Chronicle CLI provides a simple way to interact with
            repositories directly from your local environment.
          </p>

          <p>
            Initialize repositories, stage files, create commits, synchronize
            changes, clone repositories, and restore previous versions using the{" "}
            <code>chron</code> command.
          </p>

          {/* Installation */}
          {/* <div className="cli-install">
            <span className="install-label">INSTALL</span>

            <div className="install-command">
              <span>
                <b>$</b> npm install -g code-chronicle
              </span>

              <button type="button">COPY</button>
            </div>
          </div> */}

          {/* Commands */}
          <div className="cli-commands">
            <span>init</span>
            <span>add</span>
            <span>commit</span>
            <span>push</span>
            <span>pull</span>
            <span>clone</span>
            <span>revert</span>
          </div>
        </div>

        {/* Terminal */}
        <div className="cli-terminal-wrapper">
          <div className="cli-terminal">
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span className="terminal-title">chron</span>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body">
              <div className="terminal-path">~/code/my-project</div>

              <div className="terminal-line">
                <span className="prompt">$</span>
                <span>chron init</span>
              </div>

              <div className="terminal-success">✓ Repository initialized</div>

              <div className="terminal-line">
                <span className="prompt">$</span>
                <span>chron add .</span>
              </div>

              <div className="terminal-success">✓ Files staged</div>

              <div className="terminal-line">
                <span className="prompt">$</span>
                <span>chron commit "Initial commit"</span>
              </div>

              <div className="terminal-success">✓ Commit created</div>

              <div className="terminal-hash">&nbsp;&nbsp;8f42c1a</div>

              <div className="terminal-line">
                <span className="prompt">$</span>
                <span>chron push</span>
              </div>

              <div className="terminal-success">
                ✓ Changes pushed successfully
              </div>

              <div className="terminal-line terminal-cursor">
                <span className="prompt">$</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CLI;

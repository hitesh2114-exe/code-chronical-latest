import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckIcon from "@mui/icons-material/Check";
import TerminalIcon from "@mui/icons-material/Terminal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavBar from "../Commons/NavBar";
import Footer from "../Commons/Footer";
import "./DocumentationPage.css";

const navigation = [
  ["introduction", "Introduction"],
  ["getting-started", "Getting started"],
  ["authentication", "Authentication"],
  ["repositories", "Repositories"],
  ["workflow", "Daily workflow"],
  ["commands", "Command reference"],
];
const commands = [
  ["chron login", "Authenticate with your Code Chronicle account."],
  ["chron whoami", "Show the account currently used by the CLI."],
  ["chron logout", "Sign out of the current Code Chronicle account."],
  ["chron init <repoName>", "Create and initialize a new repository."],
  ["chron add <file>", "Stage a file, directory, or the entire project."],
  ["chron commit <message>", "Record the files currently in the staging area."],
  ["chron push", "Send your latest local commit to the remote repository."],
  ["chron pull", "Download remote repository changes to your machine."],
  ["chron clone <repoId>", "Clone an existing Code Chronicle repository."],
  ["chron revert <commitId>", "Restore your project to a specific commit."],
];

function CodeBlock({ children, label = "terminal" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="doc-code-block">
      <div className="doc-code-heading">
        <span>
          <TerminalIcon /> {label}
        </span>
        <button onClick={copy} aria-label="Copy command">
          {copied ? <CheckIcon /> : <ContentCopyOutlinedIcon />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

function DocumentationPage() {
  const [query, setQuery] = useState("");
  const filteredCommands = useMemo(() => {
    const search = query.trim().toLowerCase();
    return search
      ? commands.filter(([command, description]) =>
          `${command} ${description}`.toLowerCase().includes(search)
        )
      : commands;
  }, [query]);
  return (
    <div className="documentation-page">
      <NavBar />
      <main className="docs-main">
        <aside className="docs-sidebar" aria-label="Documentation navigation">
          <Link to="/" className="docs-back-link">
            ← Back to home
          </Link>
          <p className="docs-sidebar-title">DOCUMENTATION</p>
          <nav>
            {navigation.map(([id, label], index) => (
              <a href={`#${id}`} key={id}>
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
          </nav>
          <div className="docs-sidebar-note">
            <span className="docs-status-dot" /> CLI documentation
            <br />
            Version 1.0
          </div>
        </aside>
        <article className="docs-content">
          <section className="docs-hero" id="introduction">
            <span className="docs-eyebrow">CODE CHRONICLE / CLI GUIDE</span>
            <h1>
              Build your history
              <br />
              <em>from the terminal.</em>
            </h1>
            <p>
              Everything you need to install and use <code>chron</code>, the
              command-line interface for Code Chronicle.
            </p>
            <div className="docs-hero-actions">
              <a href="#getting-started">
                Start with installation <ArrowForwardIcon />
              </a>
              <span>10 commands · one workflow</span>
            </div>
          </section>
          <section id="getting-started" className="docs-section">
            <p className="docs-kicker">01 / GETTING STARTED</p>
            <h2>Install the CLI</h2>
            <p>
              Code Chronicle works through <code>chron</code>, a lightweight CLI
              that connects your local project with a remote repository. You’ll
              need Node.js, npm, and an internet connection for remote
              operations.
            </p>
            <div className="docs-note">
              <strong>Before you begin</strong>
              <span>
                npm is bundled with Node.js. Check your setup with{" "}
                <code>node --version</code> and <code>npm --version</code>.
              </span>
            </div>
            <h3>Install globally</h3>
            <p>
              Install the package once to make <code>chron</code> available from
              any folder on your machine.
            </p>
            <CodeBlock>npm install -g codechronicle-cli</CodeBlock>
            <h3>Verify the installation</h3>
            <CodeBlock>chron --help</CodeBlock>
          </section>
          <section id="authentication" className="docs-section">
            <p className="docs-kicker">02 / AUTHENTICATION</p>
            <h2>Connect your account</h2>
            <p>
              Sign in before creating or syncing repositories. Your
              authenticated account is used for every operation that needs
              repository access.
            </p>
            <div className="docs-command-grid">
              <div>
                <h3>Log in</h3>
                <p>Authenticate your terminal with Code Chronicle.</p>
                <CodeBlock>chron login</CodeBlock>
              </div>
              <div>
                <h3>Check who’s signed in</h3>
                <p>Confirm the account currently used by the CLI.</p>
                <CodeBlock>chron whoami</CodeBlock>
              </div>
            </div>
            <p className="docs-inline-tip">
              Finished working? Run <code>chron logout</code> to remove the
              current account from this machine.
            </p>
          </section>
          <section id="repositories" className="docs-section">
            <p className="docs-kicker">03 / REPOSITORIES</p>
            <h2>Create or clone a project</h2>
            <div className="docs-command-grid">
              <div>
                <h3>Start something new</h3>
                <p>Initialize a repository using a name for your project.</p>
                <CodeBlock>chron init my-project</CodeBlock>
              </div>
              <div>
                <h3>Bring down existing work</h3>
                <p>Use the repository ID from the Code Chronicle app.</p>
                <CodeBlock>{"chron clone <repoId>"}</CodeBlock>
              </div>
            </div>
          </section>
          <section id="workflow" className="docs-section">
            <p className="docs-kicker">04 / DAILY WORKFLOW</p>
            <h2>Stage. Commit. Push.</h2>
            <p>
              Once a repository is initialized, this is the core loop for saving
              your progress and sharing it with the remote project.
            </p>
            <div className="docs-flow">
              <div>
                <b>01</b>
                <strong>Stage</strong>
                <code>chron add .</code>
              </div>
              <i>→</i>
              <div>
                <b>02</b>
                <strong>Commit</strong>
                <code>chron commit "Message"</code>
              </div>
              <i>→</i>
              <div>
                <b>03</b>
                <strong>Push</strong>
                <code>chron push</code>
              </div>
            </div>
            <CodeBlock label="a typical project session">
              {'chron add .\nchron commit "Added new feature"\nchron push'}
            </CodeBlock>
            <div className="docs-pull-card">
              <span>↙</span>
              <div>
                <strong>Working with a remote repository?</strong>
                <p>
                  Fetch changes made elsewhere with <code>chron pull</code>,
                  then continue your local work.
                </p>
              </div>
            </div>
          </section>
          <section id="commands" className="docs-section docs-reference">
            <p className="docs-kicker">05 / COMMAND REFERENCE</p>
            <h2>Every command, at a glance.</h2>
            <label className="docs-search">
              <span>⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search commands"
                aria-label="Search commands"
              />
            </label>
            <div className="docs-command-list">
              {filteredCommands.map(([command, description]) => (
                <div className="docs-command-row" key={command}>
                  <code>{command}</code>
                  <p>{description}</p>
                </div>
              ))}
              {!filteredCommands.length && (
                <p className="docs-empty">No commands match “{query}”.</p>
              )}
            </div>
          </section>
          <section className="docs-closing">
            <span>READY WHEN YOU ARE</span>
            <h2>
              Make every change
              <br />
              part of the story.
            </h2>
            <Link to="/signup">
              Create an account <ArrowForwardIcon />
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
export default DocumentationPage;

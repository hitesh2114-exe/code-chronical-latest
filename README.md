# Code Chronicle

> A custom, Git-inspired version control system with a web platform and command-line interface.

Code Chronicle is a full-stack version control platform that provides Git-like repository management through both a **web application** and a **CLI**. It allows users to create and manage repositories, track changes through commits, explore projects, and synchronize code with remote repositories.

The project is built as three major components:

* **Frontend** — A React-based web interface for managing and exploring repositories.
* **Backend** — A Node.js/Express REST API that handles authentication, repositories, commits, users, and file operations.
* **CLI** — A Node.js command-line tool that provides Git-inspired version-control commands.

---

## ✨ Features

* User registration and authentication
* Create and manage repositories
* Public/private repository support
* Upload, edit, and manage files
* Commit and track project versions
* View commit history
* Explore repositories and user profiles
* Push and pull repositories
* Clone repositories
* Revert to previous commits
* Git-inspired CLI workflow
* Web-based repository management

---

## 🖥️ Web Platform

The Code Chronicle web application provides an intuitive interface for:

* Dashboard and repository management
* Repository file browsing
* Commit history and commit details
* Repository exploration
* User profiles
* Authentication
* Project documentation

### Live Links

**Frontend:**
`[ Add Frontend Live Link Here ]`

**Backend/API:**
`[ Add Backend Live Link Here ]`

---

## ⚡ Code Chronicle CLI

The **Code Chronicle CLI** provides a terminal-based workflow similar to Git.

The CLI executable is:

```bash
chron
```

### Available Commands

```bash
chron login
chron logout
chron whoami

chron init <repository-name>
chron add <file>
chron commit "<message>"

chron push
chron pull
chron clone <repository-id>
chron revert <commit-id>
```

A typical workflow looks like:

```bash
chron login
chron init my-project
chron add .
chron commit "Initial commit"
chron push
```

The CLI maintains local repository information inside a `.chron` directory and communicates with the Code Chronicle backend for remote repository operations.

---

## 📦 NPM Package

The CLI is distributed as an npm package and exposes the `chron` command.

After installing the package, the CLI can be used directly from the terminal:

```bash
chron --help
```

The package provides the command-line interface for interacting with Code Chronicle repositories without requiring users to manually interact with the web application.

---

## 🛠️ Technology Stack

| Component      | Technologies                                  |
| -------------- | --------------------------------------------- |
| Frontend       | React, Vite, React Router, Axios, Material UI |
| Backend        | Node.js, Express.js                           |
| Database       | MongoDB, Mongoose                             |
| CLI            | Node.js, Yargs, Axios, Inquirer               |
| Authentication | JWT, bcryptjs                                 |
| Validation     | Joi                                           |
| File Handling  | Multer, Archiver, Unzipper                    |

---

## 📁 Project Structure

```text
Code-Chronicle/
│
├── Frontend/       # React web application
├── Backend/        # REST API and server
├── CLI/            # Code Chronicle command-line tool
├── LICENSE         # MIT License
└── README.md
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/hitesh2114-exe/code-chronical-latest.git
cd code-chronical-latest
```

### Install Dependencies

```bash
cd Frontend
npm install
```

```bash
cd ../Backend
npm install
```

```bash
cd ../CLI
npm install
```

### Run Frontend

```bash
cd Frontend
npm run dev
```

### Run Backend

```bash
cd Backend
npm start
```

### Run CLI

```bash
cd CLI
node index.js --help
```

---

## 📚 Documentation

This README provides a quick overview of Code Chronicle.

For detailed information about the architecture, implementation, API endpoints, CLI internals, repository structure, workflows, configuration, and development process, see:

**[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)**

---

## 📄 License

Code Chronicle is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

**GitHub Repository:**
https://github.com/hitesh2114-exe/code-chronical-latest

**Live Frontend:**
`[ Add Link ]`

**Live Backend:**
`[ Add Link ]`

**NPM Package:**
`[ Add NPM Package Link ]`

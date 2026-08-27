# Code Chronicle

> A full-stack version control platform with a web application and command-line interface.

Code Chronicle is a complete version control platform that allows users to create and manage repositories, track project changes through commits, explore codebases, and synchronize projects with remote repositories.

The project consists of three major components:

* **Frontend** — React-based web application for managing and exploring repositories.
* **Backend** — Node.js/Express REST API responsible for authentication, repositories, commits, users, and file operations.
* **CLI** — Node.js command-line tool for managing Code Chronicle repositories directly from the terminal.

---

## ✨ Features

* User registration and authentication
* Create and manage repositories
* Public and private repositories
* Upload, edit, and manage files
* Create and track commits
* View commit history
* Explore repositories and user profiles
* Push and pull repositories
* Clone repositories
* Revert to previous commits
* Web-based repository management
* Command-line repository management

---

## 🌐 Live Application

**Frontend:**
https://code-chronical-latest.onrender.com/

**Backend / API:**
https://code-chronical-latest-backend.onrender.com/

---

## ⚡ Code Chronicle CLI

The Code Chronicle CLI allows users to manage repositories directly from the terminal.

### Installation

Node.js is required.

```bash
npm install -g codechronicle-cli
```

After installation:

```bash
chron --help
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

### Basic Workflow

```bash
chron login
chron init my-project
chron add .
chron commit "Initial commit"
chron push
```

The CLI maintains local repository information inside a `.chron` directory and communicates with the Code Chronicle backend for remote repository operations.

> **Current Version Note:** In the current version, every commit must be followed by a `push` operation before creating the next commit. This limitation is planned for improvement in future versions.

---

## 📦 NPM Package

Code Chronicle CLI is distributed through npm as:

**Package:** `codechronicle-cli`
**Latest Version:** `1.0.2`
**Command:** `chron`

[View codechronicle-cli on npm](https://www.npmjs.com/package/codechronicle-cli?utm_source=chatgpt.com)

---

## 🛠️ Technology Stack

| Component          | Technologies                                  |
| ------------------ | --------------------------------------------- |
| Frontend           | React, Vite, React Router, Axios, Material UI |
| Backend            | Node.js, Express.js                           |
| Database & Storage | MongoDB, Mongoose, Supabase                   |
| CLI                | Node.js, Yargs, Axios, Inquirer               |
| Authentication     | JWT, bcryptjs                                 |
| Validation         | Joi                                           |
| File Handling      | Multer, Archiver, Unzipper                    |

---

## 📁 Project Structure

```text
Code-Chronicle/
│
├── Frontend/       # React web application
├── Backend/        # REST API and server
├── CLI/            # Command-line interface
├── LICENSE         # MIT License
└── README.md
```

---

## 🚀 Getting Started

### Prerequisite

**Node.js** is required.

Check your installation:

```bash
node --version
npm --version
```

### Clone the Repository

```bash
git clone https://github.com/hitesh2114-exe/code-chronical-latest.git
cd code-chronical-latest
```

### Install Dependencies

**Frontend**

```bash
cd Frontend
npm install
```

**Backend**

```bash
cd ../Backend
npm install
```

**CLI**

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

### Run CLI Locally

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

## 🔗 Links

**GitHub Repository:**
https://github.com/hitesh2114-exe/code-chronical-latest

**Live Frontend:**
https://code-chronical-latest.onrender.com/

**Live Backend:**
https://code-chronical-latest-backend.onrender.com/

**NPM Package:**
https://www.npmjs.com/package/codechronicle-cli

---

## 📄 License

Code Chronicle is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

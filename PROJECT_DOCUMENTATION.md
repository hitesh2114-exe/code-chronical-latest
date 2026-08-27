# Code Chronicle — Project Documentation

## 1. Project Overview

**Code Chronicle** is a full-stack version control platform designed to provide a complete environment for managing source-code repositories and tracking project history.

The system combines a web application, REST API, database and storage services, and a command-line interface into a single platform.

Code Chronicle is divided into three primary components:

* **Frontend** — Provides the web interface through which users can authenticate, create and manage repositories, browse files, view commits, explore projects, and manage their profiles.
* **Backend** — Provides the REST API and handles authentication, repository management, commit operations, file management, validation, authorization, and communication with the database and storage services.
* **CLI** — Provides a terminal-based interface through which users can authenticate and perform repository operations such as initialization, staging, committing, pushing, pulling, cloning, and reverting.

The project is designed to demonstrate the complete lifecycle of a version-controlled project, from local file changes and commits to remote repository management.

---

## 2. Problem Statement

Managing the history of source-code changes requires a reliable way to record different versions of a project, identify changes, and access previous states of the codebase.

Code Chronicle addresses this requirement by providing a centralized platform where users can:

* Create and manage repositories.
* Store and organize project files.
* Record project changes as commits.
* Maintain a history of previous project states.
* Synchronize local repositories with remote repositories.
* Access repository information through both a web interface and CLI.
* Explore repositories and their commit history.

The project also focuses on implementing the underlying concepts required for repository and version management rather than relying entirely on an existing version-control platform.

---

## 3. Project Objectives

The primary objectives of Code Chronicle are:

### 3.1 Repository Management

Provide users with the ability to create, manage, explore, and delete repositories while maintaining their associated files and metadata.

### 3.2 Version Tracking

Allow project changes to be recorded as commits so that different versions of a project can be identified and accessed.

### 3.3 Local Repository Management

Provide a local repository mechanism through the CLI using the `.chron` directory to maintain repository configuration, staging information, and commit data.

### 3.4 Remote Synchronization

Allow local repositories to communicate with remote repositories through push, pull, and clone operations.

### 3.5 Web-Based Access

Provide a user-friendly web interface for repository management, file browsing, commit history, user profiles, and project exploration.

### 3.6 Command-Line Access

Provide a dedicated CLI package that allows developers to perform repository operations directly from a terminal.

### 3.7 Authentication and Authorization

Implement secure user authentication and ensure that protected repository operations can only be performed by authorized users.

### 3.8 Modular Architecture

Maintain separate frontend, backend, and CLI components so that each part of the system has a clear responsibility and can be developed independently.

---

## 4. System Overview

Code Chronicle follows a client-server architecture consisting of the frontend application, CLI, backend API, database, and storage services.

### 4.1 High-Level Architecture

```text
                         CODE CHRONICLE
                              │
               ┌──────────────┴──────────────┐
               │                             │
               ▼                             ▼
        ┌─────────────┐               ┌─────────────┐
        │  Frontend   │               │     CLI     │
        │ React/Vite  │               │   Node.js   │
        └──────┬──────┘               └──────┬──────┘
               │                             │
               └──────────────┬──────────────┘
                              │
                              ▼
                     ┌────────────────┐
                     │ Backend / API  │
                     │ Node.js +      │
                     │ Express.js     │
                     └───────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐   ┌────────────┐   ┌──────────┐
        │ MongoDB  │   │  Supabase  │   │   Auth   │
        │ Database │   │   Storage  │   │  / JWT   │
        └──────────┘   └────────────┘   └──────────┘
```

### 4.2 Frontend

The frontend is responsible for the user-facing portion of the application.

Users can interact with the system through pages and components for:

* Registration and login
* Dashboard
* Repository management
* Repository file browsing
* Commit history
* Commit details
* Repository exploration
* User profiles
* Documentation

The frontend communicates with the backend using HTTP requests and receives data from the REST API.

---

### 4.3 Backend

The backend acts as the central service layer of Code Chronicle.

Its responsibilities include:

* User authentication
* User management
* Repository management
* Commit management
* File operations
* Repository exploration
* Request validation
* Authorization
* Error handling
* Database interaction
* Storage interaction

The backend exposes REST API endpoints that are consumed by both the frontend and CLI.

---

### 4.4 CLI

The CLI provides terminal-based access to Code Chronicle.

It manages local repository information and communicates with the backend whenever remote operations are required.

The CLI supports commands for:

```text
login
logout
whoami
init
add
commit
push
pull
clone
revert
```

A local Code Chronicle repository contains a `.chron` directory that stores information required to manage the local repository.

---

### 4.5 Repository Workflow

The general repository workflow is:

```text
Project Files
     │
     ▼
chron init
     │
     ▼
.chron Repository
     │
     ▼
chron add
     │
     ▼
Staging Area
     │
     ▼
chron commit
     │
     ▼
Local Commit
     │
     ▼
chron push
     │
     ▼
Remote Repository
```

For retrieving remote changes or an existing repository:

```text
Remote Repository
       │
       ├──────────────► chron pull
       │
       └──────────────► chron clone
```

A previous project state can be restored using:

```text
Commit History
      │
      ▼
chron revert
      │
      ▼
Selected Project State
```

### 4.6 Current Version Workflow Limitation

In the current version of Code Chronicle, the CLI requires a **push operation after each commit before another commit can be created**.

The current workflow therefore follows:

```text
Add → Commit → Push → Add → Commit → Push
```

rather than allowing multiple local commits to be created and pushed together.

This is a current implementation limitation and can be improved in future versions.

---

## 5. Documentation Scope

This document provides detailed information about the implementation and operation of Code Chronicle.

The following sections describe the individual system components, their architecture, workflows, APIs, database and storage mechanisms, configuration, installation, deployment, testing, limitations, and future development plans.

## 6. Technology Stack

Code Chronicle uses a combination of modern web, server-side, database, storage, and command-line technologies.

### 6.1 Frontend Technologies

| Technology        | Purpose                                |
| ----------------- | -------------------------------------- |
| React             | Building the user interface            |
| Vite              | Frontend development and build tooling |
| React Router      | Client-side routing                    |
| Axios             | Communication with backend APIs        |
| Material UI       | UI components                          |
| Emotion           | Styling support for Material UI        |
| GSAP              | Animations and interactive effects     |
| Motion            | UI animations                          |
| Three.js          | 3D and graphical effects               |
| React Three Fiber | React integration for Three.js         |
| OGL               | WebGL-based visual effects             |
| Lenis             | Smooth scrolling                       |

The frontend is implemented as a React application and uses Vite for development and production builds.

---

### 6.2 Backend Technologies

| Technology | Purpose                        |
| ---------- | ------------------------------ |
| Node.js    | Server-side JavaScript runtime |
| Express.js | REST API framework             |
| Mongoose   | MongoDB object modeling        |
| MongoDB    | Application database           |
| JWT        | Authentication tokens          |
| bcryptjs   | Password hashing               |
| Joi        | Request and data validation    |
| Multer     | File upload handling           |
| Archiver   | Creating compressed archives   |
| Unzipper   | Extracting compressed archives |
| UUID       | Generating unique identifiers  |
| CORS       | Cross-origin request handling  |
| dotenv     | Environment configuration      |
| Supabase   | File/storage services          |

The backend follows a modular structure separating routes, controllers, services, models, middleware, validation, and utilities.

---

### 6.3 CLI Technologies

The Code Chronicle CLI is implemented as a Node.js application and distributed through npm.

| Technology | Purpose                                      |
| ---------- | -------------------------------------------- |
| Node.js    | CLI runtime                                  |
| Yargs      | Command-line argument and command management |
| Axios      | Communication with backend APIs              |
| Inquirer   | Interactive terminal prompts                 |
| Form Data  | Multipart/form-data requests                 |
| Archiver   | Creating project archives                    |
| Unzipper   | Extracting project archives                  |
| UUID       | Generating identifiers                       |
| dotenv     | Configuration management                     |

The CLI is distributed through the npm package:

**Package:** `codechronicle-cli`
**Current Version:** `1.0.2`
**Executable:** `chron`

Installation:

```bash
npm install -g codechronicle-cli
```

After installation, the CLI can be accessed using:

```bash
chron --help
```

---

### 6.4 Database and Storage

Code Chronicle uses multiple services for data and file management.

#### MongoDB

MongoDB is used as the primary application database.

It stores structured information such as:

* User information
* Repository information
* Commit information
* Repository metadata

Mongoose is used to define and interact with MongoDB models.

#### Supabase

Supabase is used as part of the project's storage infrastructure for handling file-related storage.

Repository files and other storage-related operations can be handled through the storage service while repository metadata remains managed by the backend.

---

### 6.5 Authentication

Authentication is implemented using:

* JWT for authentication tokens
* bcryptjs for password hashing
* Backend middleware for protecting restricted operations

Authentication is used by both the web application and CLI when accessing protected functionality.

---

## 7. Project Structure

Code Chronicle is organized into three major application components: **Frontend, Backend, and CLI**.

```text
Code-Chronicle/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── public/
│   │   ├── App.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── services/
│   ├── test/
│   ├── utils/
│   ├── validation/
│   ├── index.js
│   ├── nodemon.json
│   └── package.json
│
├── CLI/
│   ├── commands/
│   ├── config/
│   ├── services/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── LICENSE
├── README.md
└── PROJECT_DOCUMENTATION.md
```

---

## 7.1 Frontend Structure

The `Frontend` directory contains the complete web application.

```text
Frontend/
│
├── src/
│   ├── components/
│   │   ├── Animation/
│   │   ├── Auth/
│   │   ├── Commits/
│   │   ├── Common/
│   │   ├── Dashboard/
│   │   ├── Documentation/
│   │   ├── Explore/
│   │   ├── Home/
│   │   └── Repository/
│   │
│   ├── public/
│   ├── App.jsx
│   ├── ProtectedRoute.jsx
│   ├── ScrollToTop.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

### Important Frontend Files

**`main.jsx`**

The main entry point of the React application. It initializes the application and mounts it to the browser.

**`App.jsx`**

Defines the main application structure and routing configuration.

**`ProtectedRoute.jsx`**

Provides route protection for pages that require authentication.

**`ScrollToTop.jsx`**

Handles scroll position when navigating between pages.

**`index.css`**

Contains global CSS styles used by the application.

---

## 7.2 Backend Structure

The `Backend` directory contains the server-side implementation.

```text
Backend/
│
├── config/
├── controllers/
├── middleware/
├── model/
├── routes/
├── services/
├── test/
├── utils/
├── validation/
│
├── index.js
├── nodemon.json
└── package.json
```

### Directory Responsibilities

**`config/`**

Contains configuration-related functionality.

**`controllers/`**

Handles incoming requests and coordinates the appropriate application logic.

**`middleware/`**

Contains middleware for authentication, authorization, error handling, and other request-processing tasks.

**`model/`**

Contains database models used with MongoDB/Mongoose.

**`routes/`**

Defines the REST API endpoints.

**`services/`**

Contains reusable business logic used by controllers and other backend components.

**`test/`**

Contains backend testing-related files.

**`utils/`**

Contains reusable helper functions.

**`validation/`**

Contains request/data validation logic.

**`index.js`**

The main backend entry point. It initializes the Express server and establishes the required backend connections.

---

## 7.3 CLI Structure

The `CLI` directory contains the Code Chronicle command-line application.

```text
CLI/
│
├── commands/
│   ├── add.js
│   ├── clone.js
│   ├── commit.js
│   ├── init.js
│   ├── login.js
│   ├── logout.js
│   ├── pull.js
│   ├── push.js
│   ├── revert.js
│   └── whoami.js
│
├── config/
│   └── config.js
│
├── services/
│   ├── api.js
│   ├── authService.js
│   └── repositoryApi.js
│
├── utils/
│   ├── auth.js
│   ├── chronConfig.js
│   ├── unzipDirectory.js
│   └── zipDirectory.js
│
├── index.js
└── package.json
```

### Directory Responsibilities

**`commands/`**

Contains the implementation of individual CLI commands such as `init`, `add`, `commit`, `push`, `pull`, `clone`, and `revert`.

**`config/`**

Contains CLI configuration such as the backend/API configuration.

**`services/`**

Contains API and authentication service functions used by CLI commands.

**`utils/`**

Contains helper functions for authentication, local `.chron` configuration, directory compression, and extraction.

**`index.js`**

Acts as the CLI entry point and registers the available commands through Yargs.

---

## 7.4 Root-Level Files

### `LICENSE`

Contains the MIT License for the Code Chronicle project.

### `README.md`

Provides a concise introduction, features, setup instructions, CLI information, and links to the project's live services and npm package.

### `PROJECT_DOCUMENTATION.md`

Contains the complete technical documentation of the Code Chronicle system, including its architecture, implementation, workflows, APIs, configuration, deployment, limitations, and future improvements.


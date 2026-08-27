# Code Chronicle — Project Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Project Objectives](#3-project-objectives)
4. [System Overview](#4-system-overview)
5. [Documentation Scope](#5-documentation-scope)
6. [Technology Stack](#6-technology-stack)
7. [Project Structure](#7-project-structure)
8. [Frontend Documentation](#8-frontend-documentation)
9. [Backend Documentation](#9-backend-documentation)
10. [CLI Documentation](#10-cli-documentation)
11. [Database & Storage Documentation](#11-database--storage-documentation)
12. [Authentication & Authorization](#12-authentication--authorization)
13. [Repository & Commit Workflow](#13-repository--commit-workflow)
14. [API Documentation](#14-api-documentation)
15. [Environment Variables & Configuration](#15-environment-variables--configuration)
16. [Installation & Local Development](#16-installation--local-development)
17. [Deployment](#17-deployment)
18. [Testing](#18-testing)
19. [Current Limitations](#19-current-limitations)
20. [License](#20-license)

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

# 8. Frontend Documentation

## 8.1 Frontend Overview

The Code Chronicle frontend is a React-based web application built using **Vite**. It provides the primary graphical interface through which users interact with the Code Chronicle platform.

The frontend communicates with the backend through REST API requests and is responsible for presenting repository, user, commit, and authentication functionality in an interactive web interface.

The frontend provides interfaces for:

* User registration and login
* User authentication
* Dashboard
* Repository creation and management
* Repository file browsing
* File creation, editing, uploading, and deletion
* Commit history
* Commit details
* Repository exploration
* User profiles
* Project documentation

The frontend is designed using reusable React components and separates functionality into feature-oriented component directories.

---

## 8.2 Frontend Architecture

The frontend follows a component-based React architecture.

```text
                         Frontend
                            │
                            ▼
                     ┌─────────────┐
                     │   main.jsx  │
                     │ Entry Point │
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
                     │   App.jsx   │
                     │ Application │
                     │   Routing   │
                     └──────┬──────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
      Auth Pages       Application       Public Pages
          │               Pages              │
          │                 │                │
          ▼                 ▼                ▼
       Login /         Dashboard /       Home /
       Signup          Repository /      Explore /
                       Commits           Documentation
                            │
                            ▼
                     Backend REST API
```

The application is divided into reusable components that handle specific areas of the platform.

---

## 8.3 Application Entry Point

The main entry point of the frontend is:

```text
Frontend/src/main.jsx
```

This file initializes the React application and mounts it to the application's root HTML element.

The entry point loads the main application component and the global styling required by the application.

---

## 8.4 Main Application

The primary application component is:

```text
Frontend/src/App.jsx
```

`App.jsx` defines the main application structure and configures the application's routes.

It connects the individual frontend pages and components into a single navigable application.

The application uses **React Router** for client-side navigation.

---

## 8.5 Routing

Code Chronicle uses React Router to provide navigation between different areas of the application.

The major application routes include:

| Route                 | Purpose                   |
| --------------------- | ------------------------- |
| `/`                   | Home page                 |
| `/documentation`      | Project documentation     |
| `/signup`             | User registration         |
| `/login`              | User login                |
| `/explore`            | Repository exploration    |
| `/user/:userId`       | User profile              |
| `/dashboard`          | User dashboard            |
| `/repository/:repoId` | Repository view           |
| `/commits/:repoId`    | Repository commit history |
| `/commit/:commitId`   | Individual commit details |

Dynamic route parameters such as `:repoId`, `:commitId`, and `:userId` allow the same component structure to display information for different repositories, commits, and users.

---

## 8.6 Protected Routes

Code Chronicle contains a dedicated component:

```text
Frontend/src/ProtectedRoute.jsx
```

The `ProtectedRoute` component is used to restrict access to pages that require authentication.

The general flow is:

```text
User Requests Protected Page
            │
            ▼
     ProtectedRoute
            │
       ┌────┴────┐
       │         │
 Authenticated  Not Authenticated
       │         │
       ▼         ▼
    Continue   Redirect
    to Page    to Login
```

This prevents unauthenticated users from directly accessing protected areas of the application.

---

## 8.7 Frontend Component Structure

The frontend organizes components according to their functionality.

```text
Frontend/src/components/
│
├── Animation/
├── Auth/
├── Commits/
├── Common/
├── Dashboard/
├── Documentation/
├── Explore/
├── Home/
└── Repository/
```

### Animation

Contains components responsible for animated and visual effects used throughout the application.

### Auth

Contains components related to:

* Login
* Registration
* Authentication-related UI

### Commits

Contains components for displaying and interacting with commit information.

This includes commit history and individual commit-related views.

### Common

Contains reusable components shared across multiple pages or features.

### Dashboard

Contains components used by the authenticated user's dashboard.

### Documentation

Contains components responsible for displaying Code Chronicle's documentation pages within the web application.

### Explore

Contains components for discovering and exploring repositories and users.

### Home

Contains components used on the application's landing/home page.

### Repository

Contains components related to repository management and repository file operations.

---

## 8.8 Global Styling

Global frontend styling is defined in:

```text
Frontend/src/index.css
```

This file provides styles that apply across the application.

Individual components may also contain their own CSS or styling definitions where component-specific styling is required.

The frontend combines standard CSS with UI-library and animation technologies to create the application's visual interface.

---

## 8.9 Scroll Management

The application contains:

```text
Frontend/src/ScrollToTop.jsx
```

This component handles scroll position during navigation so that navigating between pages does not unnecessarily retain the previous page's scroll position.

---

## 8.10 Frontend Data Flow

The frontend follows a client-to-server data flow for operations that require backend information.

```text
User Interaction
       │
       ▼
React Component
       │
       ▼
API Request
       │
       ▼
Backend REST API
       │
       ▼
Database / Storage
       │
       ▼
API Response
       │
       ▼
React Component
       │
       ▼
Updated UI
```

For example, when a user opens a repository:

```text
Repository Page
       │
       ▼
Request Repository Data
       │
       ▼
Backend API
       │
       ▼
Repository Information
       │
       ▼
Frontend State
       │
       ▼
Repository UI
```

This separation keeps the frontend responsible for presentation and interaction while the backend handles the application's business logic and persistent data.

---

## 8.11 Frontend Development

The frontend uses Vite for development and production builds.

From the `Frontend` directory:

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linter

```bash
npm run lint
```

The frontend can therefore be developed independently from the backend while communicating with the configured backend API during application use.

# 9. Backend Documentation

## 9.1 Backend Overview

The Code Chronicle backend is a **Node.js and Express.js REST API** that acts as the central service layer of the platform.

It provides the APIs consumed by both the Code Chronicle frontend and CLI.

The backend is responsible for:

* User registration and authentication
* User information and profiles
* Repository creation and management
* Repository file operations
* Commit management
* Push and pull operations
* Repository cloning
* Repository exploration
* Access control and authorization
* Request validation
* Database interaction
* File and archive processing
* Error handling

The backend uses **MongoDB** as the primary database and integrates with **Supabase** for storage-related functionality.

---

## 9.2 Backend Architecture

The backend follows a layered structure that separates routing, request handling, business logic, data models, validation, and reusable utilities.

```text id="flw3f9"
                       Backend API
                           │
                           ▼
                       Routes
                           │
                           ▼
                     Controllers
                           │
                           ▼
                       Services
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
           Models                   Utilities
              │
              ▼
           MongoDB

Additional Services
              │
              ▼
          Supabase
```

The general request flow is:

```text id="q2ow1n"
Client
  │
  │ HTTP Request
  ▼
Route
  │
  ▼
Middleware
  │
  ▼
Controller
  │
  ▼
Service
  │
  ├──────────────► Database
  │
  └──────────────► Storage
  │
  ▼
Response
  │
  ▼
Client
```

This structure keeps individual responsibilities separated and makes the backend easier to maintain and extend.

---

## 9.3 Backend Entry Point

The main backend entry point is:

```text id="q0zzp5"
Backend/index.js
```

This file initializes the Express application and configures the server.

The backend performs tasks such as:

* Loading environment configuration
* Initializing Express
* Configuring middleware
* Configuring CORS
* Registering API routes
* Establishing the database connection
* Starting the HTTP server

The backend currently runs on port:

```text id="0af0ey"
8080
```

---

## 9.4 Backend Directory Structure

The backend is organized into multiple functional directories:

```text id="0ek74z"
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

Each directory has a specific responsibility within the backend architecture.

---

## 9.5 Routes

The `routes/` directory defines the HTTP endpoints exposed by the backend.

The major API areas include:

```text id="w44izn"
/api/auth
/api/repositories
/api/commits
/api/explore
/api/users
```

Routes are responsible for:

* Defining HTTP methods
* Defining URL patterns
* Connecting requests to controllers
* Applying required middleware

Routes should remain focused on request routing rather than containing large amounts of business logic.

---

## 9.6 Controllers

The `controllers/` directory contains request-handling logic.

Controllers receive requests from routes, extract required information, invoke appropriate services, and return responses to the client.

The backend contains controller functionality for areas such as:

* Authentication
* Repositories
* Commits
* Users
* Exploration

The controller layer acts as the connection between the HTTP layer and the application's business logic.

```text id="q2h8kl"
HTTP Request
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Result
     │
     ▼
HTTP Response
```

---

## 9.7 Services

The `services/` directory contains the application's business logic.

Services handle operations that should not be directly implemented inside route definitions.

The backend contains service functionality related to:

* Authentication
* Repository management
* Commit operations
* User operations
* Repository exploration

This separation allows the same business logic to be reused by different controllers or application flows.

---

## 9.8 Database Models

The `model/` directory contains the MongoDB/Mongoose models used by the application.

The primary entities include:

### User

Stores information associated with Code Chronicle users.

User-related information is used for:

* Authentication
* User profiles
* Repository ownership
* Access control

### Repository

Represents a Code Chronicle repository.

Repository information includes details required to identify and manage repositories and their associated project data.

### Commit

Represents a recorded version of a repository.

Commit information is used to maintain project history and identify individual repository states.

The relationship can be represented as:

```text id="6eyk3c"
User
 │
 └── owns ──► Repositories
                    │
                    └── contains ──► Commits
```

---

## 9.9 Middleware

The `middleware/` directory contains reusable request-processing functions.

Middleware is used for tasks such as:

* Authentication
* Authorization
* Repository ownership verification
* Error handling
* Request processing

A typical protected request follows:

```text id="qvqlxj"
Request
   │
   ▼
Authentication Middleware
   │
   ▼
Authorization / Ownership Check
   │
   ▼
Controller
   │
   ▼
Response
```

Middleware prevents protected operations from being executed without the required authentication or permissions.

---

## 9.10 Validation

The `validation/` directory contains validation logic for incoming data.

The backend uses **Joi** for request validation.

Validation ensures that incoming data satisfies the expected structure and constraints before it reaches the main business logic.

A simplified flow is:

```text id="8c2jps"
Client Data
    │
    ▼
Validation
    │
 ┌──┴───┐
 │      │
Valid  Invalid
 │      │
 ▼      ▼
Service Error Response
```

This reduces invalid data entering the application's database and business logic.

---

## 9.11 Configuration

The `config/` directory contains configuration-related functionality.

Configuration is separated from application logic so that environment-specific settings can be changed without modifying the main application code.

Sensitive configuration values such as database credentials, authentication secrets, and external service credentials should be supplied through environment variables.

---

## 9.12 Utilities

The `utils/` directory contains reusable helper functionality used throughout the backend.

Utilities are intended for operations that are shared across different parts of the application and do not belong directly to a controller or service.

---

## 9.13 File and Archive Handling

Code Chronicle performs file-related operations for repository management.

The backend uses libraries such as:

* **Multer** for handling uploaded files
* **Archiver** for creating compressed archives
* **Unzipper** for extracting archives

These operations are important for transferring repository contents between the CLI, backend, and storage systems.

A simplified repository transfer flow is:

```text id="x7n1hm"
Repository Files
      │
      ▼
Archive / Upload
      │
      ▼
Backend
      │
      ▼
Storage
```

When repository data needs to be retrieved:

```text id="7xyqrf"
Storage
   │
   ▼
Archive
   │
   ▼
Backend
   │
   ▼
Extracted Repository
```

---

## 9.14 Database

MongoDB is used as the primary database for Code Chronicle.

Mongoose provides the data-modeling layer between the Node.js backend and MongoDB.

The database stores application-level information such as:

* Users
* Repositories
* Commits
* Repository metadata

MongoDB handles structured application data while storage services are used for repository file data where required.

---

## 9.15 Supabase Integration

Supabase is integrated into the backend as part of the project's storage infrastructure.

It is used for storage-related operations involving repository files and project data.

This allows the backend to separate:

```text id="4xv3dq"
Application Metadata
        │
        ▼
     MongoDB

Repository File Storage
        │
        ▼
     Supabase
```

This separation helps keep database records and larger file-storage operations independent.

---

## 9.16 Error Handling

The backend contains dedicated error-handling functionality through middleware.

Errors can originate from:

* Invalid requests
* Authentication failures
* Authorization failures
* Missing resources
* Database operations
* File operations
* Storage operations
* Unexpected server errors

Centralized error handling provides consistent responses to clients and prevents application-specific error logic from being duplicated throughout the backend.

---

## 9.17 Backend Development

From the `Backend` directory, install dependencies using:

```bash id="j6g9q1"
npm install
```

Start the backend:

```bash id="syw2se"
npm start
```

The backend runs on port:

```text id="0f0xqm"
8080
```

The backend can then be accessed by the frontend and CLI through the configured API base URL.

---

# 10. CLI Documentation

## 10.1 CLI Overview

The **Code Chronicle CLI** is a Node.js-based command-line application that allows users to interact with Code Chronicle repositories directly from a terminal.

The CLI is distributed as an npm package:

**Package:** `codechronicle-cli`
**Current Version:** `1.0.2`
**Executable:** `chron`

Users can install the CLI globally using:

```bash
npm install -g codechronicle-cli
```

After installation, the CLI can be accessed using:

```bash
chron --help
```

The CLI communicates with the Code Chronicle backend for authentication and remote repository operations while maintaining local repository information on the user's machine.

---

## 10.2 CLI Architecture

The CLI is organized into commands, services, configuration, and utility modules.

```text id="7u1zq5"
                         Code Chronicle CLI
                                │
                         ┌──────▼──────┐
                         │   index.js  │
                         │ CLI Entry   │
                         └──────┬──────┘
                                │
                                ▼
                           Yargs Commands
                                │
        ┌──────────┬────────────┼────────────┬──────────┐
        │          │            │            │          │
        ▼          ▼            ▼            ▼          ▼
      Auth      Repository    Commit       Remote     Utility
    Commands    Commands      Commands    Commands    Functions
        │          │            │            │          │
        └──────────┴────────────┼────────────┴──────────┘
                                │
                                ▼
                           CLI Services
                                │
                                ▼
                       Code Chronicle API
```

The CLI separates individual commands into separate files, allowing each operation to have its own implementation.

---

## 10.3 CLI Directory Structure

```text id="ef5v5s"
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

### `commands/`

Contains the implementation of individual CLI commands.

### `config/`

Contains CLI configuration such as the backend API configuration.

### `services/`

Contains reusable functions for API communication, authentication, and repository operations.

### `utils/`

Contains helper functions for local configuration, authentication, directory compression, and archive extraction.

### `index.js`

Acts as the CLI entry point and registers commands using Yargs.

---

## 10.4 Installation

Node.js and npm are required to install and use the CLI.

Install the published package globally:

```bash
npm install -g codechronicle-cli
```

Verify the installation:

```bash
chron --help
```

The installed package provides the `chron` executable.

The package is available on npm:

[codechronicle-cli on npm](https://www.npmjs.com/package/codechronicle-cli?utm_source=chatgpt.com)

---

## 10.5 CLI Authentication

The CLI provides authentication commands that allow users to authenticate their terminal session with Code Chronicle.

### Login

```bash
chron login
```

The login command collects the required user credentials and authenticates the user through the backend API.

### Logout

```bash
chron logout
```

Removes the locally stored authentication information.

### Current User

```bash
chron whoami
```

Displays information about the currently authenticated Code Chronicle user.

The authentication flow can be represented as:

```text id="pfv0h3"
chron login
     │
     ▼
User Credentials
     │
     ▼
Backend Authentication API
     │
     ▼
Authentication Token
     │
     ▼
Local CLI Configuration
```

Protected commands use the stored authentication information when communicating with the backend.

---

## 10.6 Local Repository Initialization

A Code Chronicle repository can be initialized using:

```bash
chron init <repository-name>
```

The initialization process creates the required local repository configuration and prepares the current project for Code Chronicle version tracking.

A hidden `.chron` directory is used to maintain local repository information.

---

## 10.7 `.chron` Directory

The `.chron` directory acts as the local metadata directory for a Code Chronicle repository.

It stores information required by the CLI to identify and manage the local repository.

A simplified representation is:

```text id="0wq9ju"
.chron/
│
├── commits/
│
├── staging/
│
└── config.json
```

### `config.json`

Stores local repository configuration information required by the CLI.

### `staging/`

Contains files that have been added to the staging area and are prepared for the next commit.

### `commits/`

Contains locally stored commit information and project snapshots.

The `.chron` directory should generally be treated as internal repository metadata and should not be manually modified unless required for development or debugging.

---

## 10.8 Adding Files

Files are added to the staging area using:

```bash
chron add <file>
```

For example:

```bash
chron add index.js
```

A complete project can be staged using:

```bash
chron add .
```

The `add` command prepares selected files for the next commit.

The general flow is:

```text id="u8x3qm"
Working Directory
       │
       ▼
    chron add
       │
       ▼
   Staging Area
```

---

## 10.9 Creating Commits

A commit records the current staged project state.

The command format is:

```bash
chron commit "<commit-message>"
```

Example:

```bash
chron commit "Add authentication feature"
```

The commit operation creates a local project snapshot and records commit metadata.

A commit can contain information such as:

* Commit identifier
* Commit message
* Timestamp
* Parent commit information
* Repository state

The commit history can then be accessed through the Code Chronicle platform.

---

## 10.10 Push

The `push` command transfers the latest local commit to the remote Code Chronicle repository.

```bash
chron push
```

The general flow is:

```text id="l4o6vf"
Local Commit
     │
     ▼
   chron push
     │
     ▼
Backend API
     │
     ▼
Remote Repository
```

The push operation packages the required repository data and communicates with the backend to update the remote repository.

---

## 10.11 Pull

The `pull` command retrieves repository information from the remote Code Chronicle repository.

```bash
chron pull
```

The operation allows a local project to retrieve the available remote repository state.

Simplified flow:

```text id="x5q3gc"
Remote Repository
       │
       ▼
   chron pull
       │
       ▼
Backend API
       │
       ▼
Local Project
```

---

## 10.12 Clone

The `clone` command allows an existing Code Chronicle repository to be retrieved locally.

```bash
chron clone <repository-id>
```

The command communicates with the backend, retrieves the repository data, and extracts the project contents into the local environment.

The CLI uses archive utilities to package and extract repository contents during transfer.

---

## 10.13 Revert

The `revert` command allows the project to be restored to a previous commit state.

```bash
chron revert <commit-id>
```

The command uses a specified commit identifier to identify the project state that should be restored.

Simplified flow:

```text id="j2v0pq"
Commit History
      │
      ▼
Commit ID
      │
      ▼
chron revert
      │
      ▼
Selected Project State
```

---

## 10.14 Complete CLI Workflow

A typical Code Chronicle workflow is:

```text id="j19k0n"
chron login
     │
     ▼
chron init my-project
     │
     ▼
chron add .
     │
     ▼
chron commit "Initial commit"
     │
     ▼
chron push
```

For subsequent changes:

```text id="f3z0so"
Modify Files
     │
     ▼
chron add .
     │
     ▼
chron commit "Update project"
     │
     ▼
chron push
```

---

## 10.15 Current Commit and Push Limitation

In the current version of the CLI, **each commit must be followed by a push before another commit can be created**.

Therefore, the current workflow is:

```text id="b6f4sp"
Add → Commit → Push
                │
                ▼
             Add → Commit → Push
```

Users cannot currently create multiple independent local commits and push them together.

This is an implementation limitation of the current version and is a potential area for future improvement.

---

## 10.16 CLI-to-Backend Communication

The CLI communicates with the Code Chronicle backend through HTTP API requests.

The communication structure is:

```text id="q5zjgi"
CLI Command
    │
    ▼
CLI Service
    │
    ▼
API Request
    │
    ▼
Code Chronicle Backend
    │
    ▼
Database / Storage
    │
    ▼
API Response
    │
    ▼
CLI
```

The API-related functionality is separated into service modules so that individual commands do not need to implement HTTP communication independently.

---

## 10.17 Archive and File Operations

The CLI uses archive utilities for repository transfer.

### Zip

`zipDirectory.js` is responsible for creating archives from project directories when required for repository transfer.

### Unzip

`unzipDirectory.js` extracts archived repository contents when retrieving project data.

This allows complete repository contents to be transferred between the local environment and remote services.

---

## 10.18 CLI Configuration

The CLI contains configuration and authentication utilities that manage information required for communication with the Code Chronicle backend.

The configuration system allows the CLI to maintain information such as:

* API configuration
* Authentication information
* Local repository configuration

Sensitive authentication information should not be manually shared or committed to source control.

---

## 10.19 CLI Development

To work with the CLI source code directly:

```bash
cd CLI
npm install
```

Run the CLI locally:

```bash
node index.js --help
```

Individual commands can then be tested against the configured Code Chronicle backend.

For users, the recommended installation method is the published npm package:

```bash
npm install -g codechronicle-cli
```

---

## 10.20 CLI Version

The currently published CLI version is:

```text
codechronicle-cli@1.0.2
```

The package is licensed under the MIT License, consistent with the main Code Chronicle project.

The CLI is maintained and versioned independently through npm releases.

# 11. Database & Storage Documentation

## 11.1 Overview

Code Chronicle uses **MongoDB**, **Mongoose**, and **Supabase** as part of its data and storage infrastructure.

The backend separates application data management from file and storage-related operations.

```text
                    Code Chronicle Backend
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
          MongoDB                     Supabase
       Application Data           Storage Services
              │
       ┌──────┼──────┐
       │      │      │
       ▼      ▼      ▼
     Users  Repos  Commits
```

---

## 11.2 MongoDB

**MongoDB** is the primary database used by Code Chronicle for storing structured application data.

The backend communicates with MongoDB through **Mongoose**.

MongoDB is used for information such as:

* User records
* Repository records
* Commit records
* Repository metadata
* Relationships between application entities

The database stores application-level information required to manage the Code Chronicle platform.

---

## 11.3 Mongoose

**Mongoose** provides the object-modeling layer between the Node.js backend and MongoDB.

It is used to:

* Define database schemas
* Create models
* Validate model data
* Query MongoDB
* Create and update records
* Manage application data

The main database models are maintained inside:

```text
Backend/model/
```

---

## 11.4 User Data

The User model represents a Code Chronicle account.

User information is used for:

* Authentication
* User profiles
* Repository ownership
* Authorization
* Identifying repository-related activity

The relationship between users and repositories can be represented as:

```text
User
 │
 ├── Repository A
 ├── Repository B
 └── Repository C
```

A user can therefore be associated with multiple repositories.

---

## 11.5 Repository Data

The Repository model represents a Code Chronicle repository.

Repository records contain the metadata required to identify and manage repositories.

Repository information is used for:

* Repository identification
* Ownership
* Visibility
* Repository management
* Commit association
* File-related operations

The repository record acts as the central reference for the project's version history.

---

## 11.6 Commit Data

Commits represent recorded versions of a repository.

A commit is associated with a repository and contains information required to identify a particular project state.

Commit-related information includes concepts such as:

* Commit identifier
* Commit message
* Timestamp
* Parent commit
* Repository association
* Project state

The relationship can be represented as:

```text
User
  │
  ▼
Repository
  │
  ├── Commit 1
  │
  ├── Commit 2
  │
  ├── Commit 3
  │
  └── ...
```

The parent-commit relationship allows the project's version history to be represented as a sequence of states.

---

## 11.7 Entity Relationships

The primary relationships within the application are:

```text
┌──────────┐
│   User   │
└────┬─────┘
     │ owns
     ▼
┌──────────────┐
│  Repository  │
└──────┬───────┘
       │ contains
       ▼
┌──────────────┐
│    Commit    │
└──────────────┘
```

These relationships allow Code Chronicle to determine:

* Who owns a repository
* Which commits belong to a repository
* Which user is associated with repository operations
* Which project state is associated with a commit

---

## 11.8 Supabase

**Supabase** is integrated into the Code Chronicle backend as part of the project's storage infrastructure.

It supports storage-related functionality used by the application.

The backend can therefore work with separate systems for structured application data and storage-related operations:

```text
Application Data
       │
       ▼
    MongoDB

Storage Operations
       │
       ▼
    Supabase
```

This separation allows storage functionality to be handled independently from the primary application database.

---

## 11.9 Local CLI Storage

The CLI maintains local repository information through a hidden `.chron` directory.

A simplified representation is:

```text
Project/
│
├── .chron/
│   ├── config.json
│   ├── staging/
│   └── commits/
│
└── Project Files
```

The `.chron` directory contains the local information required by the CLI to manage a Code Chronicle repository.

### `config.json`

Stores local repository configuration information used by the CLI.

### `staging/`

Contains information related to files prepared for the next commit.

### `commits/`

Contains locally stored commit information and project snapshots.

The `.chron` directory represents the local repository state and is separate from the backend's database and storage systems.

---

## 11.10 Data Flow During Repository Operations

### Repository Creation

When a repository is created, the backend processes the repository information and stores the required application data.

```text
User
 │
 ▼
Backend API
 │
 ▼
MongoDB
 │
 └── Repository Metadata
```

### Commit

When a commit is created through the CLI:

```text
Local Project
      │
      ▼
CLI Commit
      │
      ▼
Local Commit State
      │
      ▼
Commit Information
```

The commit information can subsequently be synchronized with the remote repository through the push operation.

### Push

When a commit is pushed:

```text
Local Repository
      │
      ▼
CLI Push
      │
      ▼
Backend API
      │
      ├──────────────► Database
      │
      └──────────────► Storage
```

The backend coordinates the required repository and commit operations between the CLI and the remote infrastructure.

---

## 11.11 Data Responsibility Summary

| System       | Primary Responsibility                      |
| ------------ | ------------------------------------------- |
| MongoDB      | Application and repository metadata         |
| Mongoose     | MongoDB data modeling and interaction       |
| Supabase     | Storage-related functionality               |
| Backend      | Coordinates database and storage operations |
| CLI `.chron` | Local repository metadata and state         |

This separation allows Code Chronicle to maintain local repository state through the CLI while using backend services for persistent remote data and storage.

# 12. Authentication & Authorization

## 12.1 Overview

Code Chronicle uses an authentication and authorization system to protect user accounts and restricted repository operations.

Authentication is handled through the backend and is used by both the **web application** and the **CLI**.

The system uses:

* **JWT** for authentication tokens
* **bcryptjs** for password hashing
* Authentication middleware for protected requests
* Authorization checks for restricted repository operations

The general authentication flow is:

```text id="v9e8ny"
User
 │
 ▼
Login / Registration
 │
 ▼
Backend Authentication API
 │
 ▼
Credential Verification
 │
 ▼
JWT Token
 │
 ├──────────────► Frontend
 │
 └──────────────► CLI
```

---

## 12.2 User Registration

New users can create a Code Chronicle account through the registration interface.

The registration process follows:

```text id="1y8i9t"
Registration Form
       │
       ▼
Frontend
       │
       ▼
Backend API
       │
       ▼
Validate User Data
       │
       ▼
Hash Password
       │
       ▼
Store User
       │
       ▼
MongoDB
```

Passwords are processed using `bcryptjs` before being stored.

Plain-text passwords should not be stored in the database.

---

## 12.3 User Login

Existing users can authenticate through the login interface.

The general process is:

```text id="0k5m90"
Login Credentials
       │
       ▼
Backend
       │
       ▼
Find User
       │
       ▼
Verify Password
       │
       ▼
Generate JWT
       │
       ▼
Return Authentication Response
```

The authentication token is subsequently used when accessing protected functionality.

---

## 12.4 JWT Authentication

JSON Web Tokens (JWT) are used to identify authenticated users when making protected API requests.

A simplified request flow is:

```text id="q36v1y"
Client
  │
  │ Request + JWT
  ▼
Authentication Middleware
  │
  ▼
Verify Token
  │
 ┌┴─────────────┐
 │              │
Valid          Invalid
 │              │
 ▼              ▼
Continue      Reject
Request       Request
```

The backend verifies the token before allowing access to protected operations.

---

## 12.5 Frontend Authentication

The frontend provides dedicated authentication pages for:

* Registration
* Login

Protected application areas use the `ProtectedRoute` component.

The frontend authentication flow can be represented as:

```text id="b3f3tr"
Login
 │
 ▼
Authentication API
 │
 ▼
JWT / Authentication State
 │
 ▼
ProtectedRoute
 │
 ├── Authenticated ──► Protected Page
 │
 └── Not Authenticated ──► Login
```

This prevents users who are not authenticated from directly accessing restricted application pages.

---

## 12.6 CLI Authentication

The CLI provides its own authentication commands:

```bash id="v1c5zq"
chron login
chron logout
chron whoami
```

### `chron login`

Authenticates the CLI user through the Code Chronicle backend.

### `chron logout`

Removes the locally stored authentication information.

### `chron whoami`

Displays information about the currently authenticated user.

The CLI maintains the required authentication information locally so that protected commands can communicate with the backend.

---

## 12.7 Authorization

Authentication determines **who the user is**, while authorization determines **what the user is allowed to do**.

Code Chronicle applies authorization checks to protected repository operations.

For example, repository management operations can require the authenticated user to have the appropriate ownership or access permissions.

The general flow is:

```text id="k7fr5e"
Request
   │
   ▼
Authenticate User
   │
   ▼
Identify User
   │
   ▼
Check Authorization
   │
 ┌─┴───────────┐
 │             │
Allowed       Denied
 │             │
 ▼             ▼
Operation    Error Response
```

---

## 12.8 Repository Ownership

Repository ownership is an important part of authorization.

The backend associates repositories with users and can use this relationship when determining whether a user can perform restricted repository operations.

```text id="k7z8l3"
User
 │
 │ owns
 ▼
Repository
 │
 ├── File Operations
 ├── Commit Operations
 └── Repository Management
```

Operations that modify or manage a repository can therefore be protected using the authenticated user's identity and repository ownership.

---

## 12.9 Protected API Requests

Protected requests generally follow this sequence:

```text id="2c72zj"
Frontend / CLI
      │
      ▼
HTTP Request
      │
      ▼
Authentication Middleware
      │
      ▼
Authorization Check
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Database / Storage
```

If authentication or authorization fails, the request is rejected before the protected operation is performed.

---

## 12.10 Password Security

User passwords are handled using **bcryptjs**.

The purpose of password hashing is to ensure that the original password is not directly stored in the database.

The conceptual process is:

```text id="m5e3l9"
User Password
      │
      ▼
bcryptjs
      │
      ▼
Password Hash
      │
      ▼
MongoDB
```

During login, the supplied password is compared against the stored hash rather than being compared with a stored plain-text password.

---

## 12.11 Authentication Components

The authentication system is distributed across several parts of the project.

### Backend

Responsible for:

* Registration
* Login
* Password verification
* JWT generation and verification
* Authentication middleware
* Authorization checks

### Frontend

Responsible for:

* Registration interface
* Login interface
* Authentication state
* Protected routes

### CLI

Responsible for:

* Terminal-based login
* Logout
* Current-user information
* Maintaining local authentication information
* Sending authenticated API requests

---

## 12.12 Authentication Security Considerations

Authentication credentials and secrets should be managed through secure configuration rather than committed to source control.

The following information should never be exposed publicly:

* User passwords
* JWT secrets
* Database credentials
* External service credentials
* Authentication tokens

The authentication system should also be kept behind HTTPS in production deployments to protect credentials and tokens while they are being transmitted.


# 13. Repository & Commit Workflow

## 13.1 Overview

Repository and commit management form the core functionality of Code Chronicle.

A repository represents a project managed through Code Chronicle, while commits represent recorded versions of that project.

The workflow involves two main environments:

* **Local repository** — Managed through the Code Chronicle CLI and the `.chron` directory.
* **Remote repository** — Managed through the Code Chronicle backend and accessed through the web application or CLI.

The overall workflow is:

```text id="n5o6la"
Local Project
     │
     ▼
chron init
     │
     ▼
Local Repository
     │
     ▼
chron add
     │
     ▼
Staging
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

---

## 13.2 Repository Initialization

A repository is initialized using:

```bash id="0p1iym"
chron init <repository-name>
```

The initialization process prepares the current project for Code Chronicle version tracking.

A `.chron` directory is created to maintain local repository information.

```text id="p3o7t5"
Project/
│
├── .chron/
│   ├── config.json
│   ├── staging/
│   └── commits/
│
└── Project Files
```

The local configuration allows the CLI to associate the project with its Code Chronicle repository.

---

## 13.3 Staging Files

Before creating a commit, files are added to the staging area.

```bash id="c2d0u4"
chron add <file>
```

For example:

```bash id="n1fn8t"
chron add app.js
```

Multiple files or the entire project can be added:

```bash id="e6v1xb"
chron add .
```

The staging process can be represented as:

```text id="r9gqwl"
Working Directory
       │
       │ chron add
       ▼
   Staging Area
```

Only the files prepared through the staging process are considered for the subsequent commit.

---

## 13.4 Creating a Commit

A commit records the staged state of the project.

```bash id="a3s5ty"
chron commit "<commit-message>"
```

Example:

```bash id="f4d9x1"
chron commit "Add repository authentication"
```

The commit operation creates a local representation of the project state and records relevant commit information.

A commit contains concepts such as:

* Unique commit identifier
* Commit message
* Timestamp
* Parent commit
* Repository association
* Project state

The commit history forms a sequence of project versions.

```text id="y0b6pj"
Commit 1
   │
   ▼
Commit 2
   │
   ▼
Commit 3
   │
   ▼
Commit 4
```

---

## 13.5 Local Commit Storage

The CLI stores local commit information inside:

```text id="4bqudi"
.chron/commits/
```

Each commit can contain the project state and associated metadata required by the CLI.

This provides a local representation of the project's version history before it is synchronized with the remote repository.

---

## 13.6 Push

The `push` command synchronizes the latest local commit with the remote repository.

```bash id="6j0g6s"
chron push
```

The push process can be represented as:

```text id="4jjxip"
Local Commit
     │
     ▼
chron push
     │
     ▼
Backend API
     │
     ▼
Remote Repository
```

The backend processes the incoming repository and commit information and updates the remote repository accordingly.

---

## 13.7 Pull

The `pull` command retrieves repository information from the remote repository.

```bash id="q5m8xv"
chron pull
```

The general flow is:

```text id="q0rbr2"
Remote Repository
       │
       ▼
Backend API
       │
       ▼
chron pull
       │
       ▼
Local Project
```

Pull is used when the local project needs to retrieve the available remote repository state.

---

## 13.8 Clone

An existing repository can be downloaded using:

```bash id="gq5x4p"
chron clone <repository-id>
```

The clone operation:

1. Identifies the requested remote repository.
2. Communicates with the Code Chronicle backend.
3. Retrieves the repository contents and relevant information.
4. Creates the project locally.
5. Initializes the required local repository configuration.

The simplified flow is:

```text id="2k9s3r"
Remote Repository
       │
       ▼
   chron clone
       │
       ▼
Local Project
       │
       ▼
.chron/
```

---

## 13.9 Revert

A previous project state can be restored using:

```bash id="l5y5pq"
chron revert <commit-id>
```

The commit identifier specifies the project version that should be restored.

The workflow is:

```text id="0a8p8k"
Commit History
      │
      ▼
Select Commit
      │
      ▼
chron revert
      │
      ▼
Restore Project State
```

Reverting allows users to move the working project back to a previously recorded state.

---

## 13.10 Repository Lifecycle

The complete lifecycle of a repository can be represented as:

```text id="8z3m9a"
Create / Initialize
        │
        ▼
     Add Files
        │
        ▼
      Commit
        │
        ▼
       Push
        │
        ▼
 Remote Repository
        │
   ┌────┴────┐
   │         │
  Pull     Clone
   │         │
   ▼         ▼
Local      Local
Project    Project
   │
   ▼
  Revert
```

---

## 13.11 Web Repository Workflow

Repository functionality is also available through the Code Chronicle web application.

Users can interact with repositories through the web interface to perform operations such as:

* Creating repositories
* Viewing repository information
* Browsing files
* Uploading files
* Editing files
* Deleting files
* Viewing commits
* Viewing individual commit details
* Managing repository visibility

The frontend communicates with the backend API to perform these operations.

```text id="d3f9oa"
Web Interface
      │
      ▼
Backend API
      │
      ├──► Repository Data
      │
      ├──► Commit Data
      │
      └──► File Operations
```

---

## 13.12 CLI and Web Repository Consistency

The CLI and web application interact with the same backend infrastructure.

```text id="y5f5hl"
       ┌─────────────┐
       │  Frontend   │
       └──────┬──────┘
              │
              │
              ▼
       ┌─────────────┐
       │   Backend   │
       │     API     │
       └──────┬──────┘
              ▲
              │
              │
       ┌──────┴──────┐
       │     CLI     │
       └─────────────┘
```

This allows repository information and operations to be accessed through both interfaces.

---

## 13.13 Current Commit Workflow Limitation

The current CLI implementation requires a push after each commit before another commit can be created.

Therefore, the supported workflow is:

```text id="j0c2t6"
chron add .
     │
     ▼
chron commit "Change 1"
     │
     ▼
chron push
     │
     ▼
chron add .
     │
     ▼
chron commit "Change 2"
     │
     ▼
chron push
```

Multiple local commits cannot currently be accumulated and pushed together.

This limitation is part of the current implementation and can be addressed in a future version by allowing independent local commits to exist before synchronization.

---

## 13.14 Repository and Commit Responsibilities

| Operation                           | Primary Component  |
| ----------------------------------- | ------------------ |
| Initialize local repository         | CLI                |
| Stage files                         | CLI                |
| Create local commit                 | CLI                |
| Push commit                         | CLI + Backend      |
| Pull remote state                   | CLI + Backend      |
| Clone repository                    | CLI + Backend      |
| Revert project state                | CLI                |
| Create/manage repository through UI | Frontend + Backend |
| Store repository metadata           | Backend + MongoDB  |
| Maintain local repository state     | CLI + `.chron`     |

This workflow forms the central version-management mechanism of Code Chronicle.

# 14. API Documentation

## 14.1 API Overview

The Code Chronicle backend exposes a REST API used by both the web frontend and CLI.

The API provides functionality for:

* Authentication
* User management
* Repository management
* Commit management
* Repository exploration
* File operations

The API follows a resource-based structure with separate route groups for different areas of the application.

```text id="g8q4qa"
Frontend ──────┐
               │
               ▼
          Code Chronicle API
               │
CLI ───────────┘
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
     Auth  Repositories Commits
               │
          ┌────┴────┐
          ▼         ▼
        Users     Explore
```

---

## 14.2 Base URL

For the deployed backend, the API is hosted at:

```text id="z2b0ja"
https://code-chronical-latest-backend.onrender.com/
```

The backend API routes are exposed below this base service.

During local development, the backend runs on port `8080`.

```text id="g2v3i5"
http://localhost:8080/
```

---

## 14.3 Authentication API

Authentication routes are grouped under:

```text id="x7j9q3"
/api/auth
```

### Register

```text
POST /api/auth/register
```

Creates a new Code Chronicle user account.

The request contains the information required to create the account.

### Login

```text
POST /api/auth/login
```

Authenticates an existing user and returns the authentication information required for protected operations.

### Current User

```text
GET /api/auth/me
```

Retrieves information about the currently authenticated user.

---

## 14.4 Repository API

Repository-related routes are grouped under:

```text id="g5h5z8"
/api/repositories
```

The repository API supports operations such as:

* Creating repositories
* Listing a user's repositories
* Retrieving repository information
* Updating repositories
* Deleting repositories
* Changing repository visibility
* Uploading files
* Retrieving files
* Updating files
* Deleting files
* Pushing repository changes
* Pulling repository data
* Cloning repositories

### Major Repository Endpoints

| Method   | Endpoint                                      | Purpose                         |
| -------- | --------------------------------------------- | ------------------------------- |
| `POST`   | `/api/repositories`                           | Create repository               |
| `GET`    | `/api/repositories/my`                        | Retrieve user's repositories    |
| `GET`    | `/api/repositories/:repoId`                   | Retrieve repository             |
| `PATCH`  | `/api/repositories/:repoId`                   | Update repository               |
| `DELETE` | `/api/repositories/:repoId`                   | Delete repository               |
| `PATCH`  | `/api/repositories/:repoId/change-visibility` | Change visibility               |
| `GET`    | `/api/repositories/:repoId/files`             | Retrieve repository files       |
| `GET`    | `/api/repositories/:repoId/file`              | Retrieve a file                 |
| `PUT`    | `/api/repositories/:repoId/file`              | Update a file                   |
| `DELETE` | `/api/repositories/:repoId/file`              | Delete a file                   |
| `POST`   | `/api/repositories/:repoId/upload`            | Upload repository data          |
| `POST`   | `/api/repositories/:repoId/upload-files`      | Upload files                    |
| `POST`   | `/api/repositories/:repositoryId/push`        | Push repository changes         |
| `GET`    | `/api/repositories/:repositoryId/pull`        | Retrieve remote repository data |
| `GET`    | `/api/repositories/:repositoryId/clone`       | Clone repository                |
| `GET`    | `/api/repositories/:repoId/latest-commit`     | Retrieve latest commit          |

---

## 14.5 Commit API

Commit-related functionality is grouped under:

```text id="l8f5my"
/api/commits
```

The commit API provides access to repository history and individual commit information.

### Endpoints

| Method | Endpoint                          | Purpose                       |
| ------ | --------------------------------- | ----------------------------- |
| `GET`  | `/api/commits/:repoId`            | Retrieve repository commits   |
| `GET`  | `/api/commits/get/:commitId`      | Retrieve a specific commit    |
| `GET`  | `/api/commits/get/:commitId/file` | Retrieve a file from a commit |

These endpoints are primarily used by the frontend to display commit history and commit details.

---

## 14.6 Exploration API

Repository exploration functionality is grouped under:

```text id="0a2mup"
/api/explore
```

The exploration API supports functionality for discovering repositories and related public information.

It is used by the frontend's exploration functionality.

---

## 14.7 User API

User-related routes are grouped under:

```text id="2h8j4a"
/api/users
```

These endpoints provide user-related information required by features such as user profiles and repository exploration.

---

## 14.8 API Authentication

Protected endpoints require the client to provide valid authentication information.

The general request structure is:

```text id="d4y7l0"
Client
  │
  │ Request + Authentication Token
  ▼
Backend
  │
  ▼
Authentication Middleware
  │
  ▼
Authorization Check
  │
  ▼
Route Handler
```

Requests without valid authentication information are rejected when the requested operation requires an authenticated user.

---

## 14.9 API Request Flow

A typical API request follows:

```text id="1g7x7e"
Frontend / CLI
      │
      ▼
HTTP Request
      │
      ▼
Route
      │
      ▼
Middleware
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Database / Storage
      │
      ▼
Response
      │
      ▼
Frontend / CLI
```

This structure separates HTTP handling from business logic and data access.

---

## 14.10 Repository Push API

The push operation is primarily used by the CLI to synchronize a local commit with the remote repository.

```text
POST /api/repositories/:repositoryId/push
```

The general flow is:

```text id="7m9g4x"
Local CLI Repository
        │
        ▼
     chron push
        │
        ▼
Push API
        │
        ▼
Backend Processing
        │
        ▼
Remote Repository
```

The backend processes the repository and commit information supplied by the CLI.

---

## 14.11 Repository Pull API

The pull operation retrieves remote repository information.

```text
GET /api/repositories/:repositoryId/pull
```

The general flow is:

```text id="x4z3pd"
Remote Repository
       │
       ▼
 Pull API
       │
       ▼
      CLI
       │
       ▼
Local Repository
```

---

## 14.12 Clone API

The clone operation retrieves an existing repository for local use.

```text
GET /api/repositories/:repositoryId/clone
```

The CLI uses this functionality when executing:

```bash id="y6i8v1"
chron clone <repository-id>
```

---

## 14.13 File APIs

The repository API provides endpoints for file operations.

Supported operations include:

* Retrieve files
* Retrieve individual files
* Upload files
* Update files
* Delete files

These operations allow the web application to provide repository file-management functionality.

---

## 14.14 API Responses

API responses are returned to the requesting client after the requested operation has been processed.

Successful responses generally provide the requested resource or operation result.

When an operation cannot be completed, the backend returns an appropriate HTTP error response.

Common categories include:

```text id="08j8sm"
2xx → Successful operation
4xx → Client/request/authentication error
5xx → Server-side error
```

The exact response structure depends on the individual endpoint.

---

## 14.15 API Error Handling

Errors can occur due to:

* Invalid request data
* Missing required information
* Authentication failure
* Authorization failure
* Resource not found
* Database errors
* File operation errors
* Unexpected server errors

The backend's error-handling middleware provides centralized processing for server-side errors.

---

## 14.16 Frontend API Usage

The frontend communicates with the backend using HTTP requests, primarily through Axios.

The frontend uses API operations for:

* Authentication
* Repository management
* File operations
* Commit history
* User information
* Repository exploration

The response from the backend is then used to update the corresponding React interface.

---

## 14.17 CLI API Usage

The CLI uses API service modules to communicate with the backend.

The main service modules include:

```text id="f8s7hl"
CLI/services/
├── api.js
├── authService.js
└── repositoryApi.js
```

These services provide reusable API communication for CLI commands.

This prevents individual commands from having to independently implement the complete HTTP communication logic.

---

## 14.18 API Security

Protected API operations use authentication and authorization mechanisms to restrict access.

Security considerations include:

* Authentication token verification
* Repository ownership checks
* Request validation
* Password hashing
* Secure handling of credentials
* HTTPS for production communication

Sensitive authentication information should never be included directly in source code or committed to the repository.

---

## 14.19 API Development and Testing

The backend API can be tested locally by running the backend server:

```bash id="4m1zqt"
cd Backend
npm install
npm start
```

The local backend is available at:

```text id="ap1t8c"
http://localhost:8080/
```

API endpoints can then be tested using the frontend, CLI, or an API testing tool.


# 15. Environment Variables & Configuration

Code Chronicle uses environment variables for deployment-specific and sensitive configuration.

## 15.1 Backend

The backend uses environment variables for services such as:

* MongoDB
* JWT authentication
* Supabase
* Other service credentials

The configuration is maintained through a backend `.env` file during local development.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

The exact variable names should match those used by the backend implementation.

## 15.2 Frontend

The frontend can use Vite environment variables for backend API configuration.

Example:

```env
VITE_API_URL=http://localhost:8080
```

For production, the frontend communicates with the deployed backend:

```text
https://code-chronical-latest-backend.onrender.com/
```

## 15.3 CLI

The CLI maintains its own configuration through its configuration and utility modules. It does not require the backend `.env` file for normal CLI usage.

## 15.4 Security

Sensitive information such as database credentials, JWT secrets, API keys, and service credentials must not be committed to the repository.

Environment files containing secrets should be excluded through `.gitignore`.

Configuration should be provided separately for development and production environments.

# 16. Installation & Local Development

## 16.1 Prerequisites

The following are required to run Code Chronicle locally:

* **Node.js**
* **npm**
* **MongoDB**
* Internet connection for required external services

Verify Node.js and npm:

```bash
node --version
npm --version
```

---

## 16.2 Clone the Repository

```bash
git clone https://github.com/hitesh2114-exe/code-chronical-latest.git
cd code-chronical-latest
```

---

## 16.3 Install Dependencies

Each component has its own dependencies.

### Frontend

```bash
cd Frontend
npm install
```

### Backend

```bash
cd ../Backend
npm install
```

### CLI

```bash
cd ../CLI
npm install
```

---

## 16.4 Run the Backend

From the `Backend` directory:

```bash
npm start
```

The local backend runs on:

```text
http://localhost:8080/
```

---

## 16.5 Run the Frontend

From the `Frontend` directory:

```bash
npm run dev
```

The development URL is provided by Vite in the terminal.

---

## 16.6 Run the CLI

For local CLI development:

```bash
cd CLI
node index.js --help
```

For normal usage, the published npm package can be installed globally:

```bash
npm install -g codechronicle-cli
```

Then:

```bash
chron --help
```

---

## 16.7 Local Development Flow

For complete local development, the components work together as follows:

```text
Frontend ──┐
           ├──► Backend ──► MongoDB / Supabase
CLI ───────┘
```

The frontend and CLI communicate with the backend API, while the backend manages application data and storage services.

# 17. Deployment

## 17.1 Deployment Overview

Code Chronicle is deployed as separate frontend and backend services.

```text id="j7k8x9"
User
 │
 ▼
Frontend
 │
 ▼
Backend API
 │
 ├──► MongoDB
 └──► Supabase
```

The CLI is distributed separately through npm.

---

## 17.2 Frontend Deployment

The React frontend is deployed on **Render**.

**Production URL:**

```text id="h3s5n2"
https://code-chronical-latest.onrender.com/
```

The frontend is built using Vite before deployment.

Production build:

```bash id="v7c1x4"
npm run build
```

---

## 17.3 Backend Deployment

The Node.js/Express backend is deployed on **Render**.

**Production URL:**

```text id="k8m2q1"
https://code-chronical-latest-backend.onrender.com/
```

The backend runs as a web service and communicates with the configured database and storage services.

---

## 17.4 Database and Storage

The production backend connects to the configured:

* MongoDB database
* Supabase services

Connection credentials are provided through the deployment platform's environment variables.

---

## 17.5 CLI Distribution

The Code Chronicle CLI is distributed through npm.

```text id="n6f4r8"
Package: codechronicle-cli
Version: 1.0.2
Command: chron
```

Installation:

```bash id="y2v5k7"
npm install -g codechronicle-cli
```

---

## 17.6 Deployment Summary

| Component | Platform | Purpose          |
| --------- | -------- | ---------------- |
| Frontend  | Render   | Web application  |
| Backend   | Render   | REST API         |
| Database  | MongoDB  | Application data |
| Storage   | Supabase | Storage services |
| CLI       | npm      | CLI distribution |

# 18. Testing

## 18.1 Overview

Testing in Code Chronicle focuses on verifying the functionality of the backend, frontend, and CLI and ensuring that the main repository workflows operate correctly.

## 18.2 Backend Testing

The backend contains a dedicated testing directory:

```text
Backend/test/
```

Backend testing can be used to verify areas such as:

* Authentication
* Repository operations
* Commit operations
* API behavior
* Validation
* Error handling

## 18.3 Frontend Testing

The frontend includes an ESLint-based code-quality check.

Run:

```bash
npm run lint
```

The linting process helps identify code-quality and syntax issues before deployment.

## 18.4 CLI Testing

The CLI can be tested by installing the published npm package:

```bash
npm install -g codechronicle-cli
```

Then verify the installation:

```bash
chron --help
```

The primary CLI workflow can be tested using:

```text
login → init → add → commit → push
```

Additional commands such as `pull`, `clone`, and `revert` can be tested against available repositories.

## 18.5 Manual Testing

Manual testing is useful for verifying complete end-to-end workflows involving:

* Frontend → Backend communication
* CLI → Backend communication
* Repository creation
* File operations
* Commit and push operations
* Authentication
* Repository exploration

Testing should be performed locally before deploying significant changes to the production services.

# 19. Current Limitations

The current version of Code Chronicle has the following known limitations:

### 19.1 Commit and Push Workflow

In the current CLI implementation, a **push is required after each commit before creating another commit**.

The current workflow is:

```text id="1v6c8g"
Add → Commit → Push → Add → Commit → Push
```

Multiple local commits cannot currently be accumulated and pushed together.

### 19.2 Future Improvements

The commit workflow can be improved in future versions to support multiple local commits before synchronization with the remote repository.

---

# 20. License

Code Chronicle is released under the **MIT License**.

The MIT License permits users to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software, subject to the conditions of the license.

The complete license text is available in the project's:

```text id="8k4xq2"
LICENSE
```

file.

The Code Chronicle CLI is also distributed under the MIT License.

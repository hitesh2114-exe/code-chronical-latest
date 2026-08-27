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

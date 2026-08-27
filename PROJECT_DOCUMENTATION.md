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

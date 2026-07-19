const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
  const projectRoot = process.cwd();
  const repoPath = path.join(projectRoot, ".vcsGit");
  // path.join → combines segments into a clean, normalized path
  const stagingPath = path.join(repoPath, "staging");

  try {
    // Ensure the user has initialized a Code Chronicle repository first (.vcsGit exists or not).
    await fs.access(repoPath);

    // "add ." stages the complete project.
    if (filePath === ".") {
      await copyDirectory(projectRoot, stagingPath, projectRoot);
      console.log("All project files added to the staging area.");
      return;
    }

    // Convert the provided file path into an absolute path.
    const sourcePath = path.resolve(projectRoot, filePath);

    // Check whether the requested file actually exists.
    const fileStat = await fs.stat(sourcePath);

    // Preserve the file's relative directory structure inside staging.
    const relativePath = path.relative(projectRoot, sourcePath);
    // path.relative(from, to) → gives the relative path from 'from' to 'to'

    // Prevent files outside the current project from being staged.
    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
      console.log("Cannot add files outside the repository.");
      return;
    }

    const destinationPath = path.join(stagingPath, relativePath);

    if (fileStat.isFile()) {
      // If only a file is added
      // Create parent folders when adding files such as src/controllers/user.js.
      await fs.mkdir(path.dirname(destinationPath), { recursive: true });
      await fs.copyFile(sourcePath, destinationPath);
    } else if (fileStat.isDirectory()) {
      // If the whole directory is added
      await copyDirectory(sourcePath, destinationPath, projectRoot);
    } else {
      console.log("Unsupported file type.");
      return;
    }

    if (fileStat.isFile()) {
      console.log(`File '${relativePath}' added to the staging area.`);
    } else {
      console.log(`Directory '${relativePath}' added to the staging area.`);
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(
        "Repository or file not found. Initialize the repository first and check the file path."
      );
      return;
    }
    console.error("Error adding file:", err.message);
  }
}

async function copyDirectory(source, destination) {
  await fs.mkdir(destination, { recursive: true });

  const entries = await fs.readdir(source, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (entry.name === ".vcsGit" || entry.name === "node_modules") {
      continue;
    }

    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
    } else {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
}

module.exports = { addRepo };

/*
============================================================
WORKING OF ADD COMMAND
============================================================

The addRepo() function adds a selected file from the working directory
to the local staging area of the Code Chronicle version-control system.

When the user runs:
    node index.js add <filePath>

Example:
    node index.js add src/app.js

1. index.js uses Yargs to detect the "add" command and passes the
   provided file path to addRepo(filePath).

2. process.cwd() identifies the directory where the command was
   executed. This directory is treated as the repository/project root.

3. The function locates the ".vcsGit" directory created earlier by
   the "init" command.

4. fs.access() checks whether ".vcsGit" exists. This ensures that
   the repository has been initialized before files can be staged.

5. path.resolve() converts the provided file path into an absolute
   path so that filesystem operations can reliably locate the file.

6. fs.stat() checks the provided path and verifies that it represents
   a file. Currently, this implementation supports adding individual
   files rather than entire directories.

7. path.relative() calculates the file's location relative to the
   project root. This allows the original directory structure to be
   preserved inside the staging area.

   For example:

       Project file:
       src/app.js

       Staged file:
       .vcsGit/staging/src/app.js

8. Files located outside the current repository are rejected to prevent
   unrelated files from being added to the staging area.

9. Before copying the file, fs.mkdir() with { recursive: true } creates
   any required parent directories inside the staging area.

10. fs.copyFile() copies the selected file from the working directory
    into ".vcsGit/staging".

The original file remains unchanged in the working directory. The
staging area contains a copy representing the version of the file that
will be included in the next commit.

Overall flow:

CLI Command
    ↓
node index.js add src/app.js
    ↓
Yargs detects "add"
    ↓
addRepo("src/app.js")
    ↓
Check .vcsGit exists
    ↓
Locate and validate the source file
    ↓
Calculate its relative project path
    ↓
Preserve directory structure
    ↓
Copy file to staging
    ↓
.vcsGit/staging/src/app.js

Current VCS Flow:

Working Directory
        │
        │ add
        ▼
.vcsGit/staging/
        │
        │ commit
        ▼
.vcsGit/commits/
        │
        │ push
        ▼
Remote Storage (Supabase)

Important:
The "add" command is completely local. It does not create a commit
and does not communicate with Supabase. Its responsibility is only
to prepare selected files in the staging area for the next commit.

Unlike real Git, which uses an index and a content-addressable object
database internally, Code Chronicle currently uses physical file copies
inside the staging directory. This provides a simpler Git-inspired
version-control implementation.
============================================================
*/

/*
==========================================
        WORKING OF copyDirectory()
==========================================

Purpose:
--------
This helper function recursively copies an entire directory from the source
location to the destination while preserving the original folder structure.

It is mainly used by the "add" command whenever the user stages a complete
folder instead of a single file.

Example:
--------
Project Structure

controllers/
├── add.js
├── commit.js
└── auth/
    ├── login.js
    └── signup.js

Command:
    node index.js add controllers

Result:

.vcsGit/
└── staging/
    └── controllers/
        ├── add.js
        ├── commit.js
        └── auth/
            ├── login.js
            └── signup.js


Working Flow:
-------------

1. Create the destination directory.
   ---------------------------------
   fs.mkdir(destination, { recursive: true })

   Before copying anything, we ensure that the destination folder exists.
   The recursive option automatically creates any missing parent directories.


2. Read all entries inside the source directory.
   ---------------------------------------------
   fs.readdir(source, { withFileTypes: true })

   Instead of returning only file names, Node returns Dirent objects.

   This allows us to distinguish between:
       • Files
       • Directories

   using methods such as:
       entry.isFile()
       entry.isDirectory()


3. Iterate over every entry.
   --------------------------
   Each file and folder inside the current directory is processed one by one.


4. Ignore unnecessary directories.
   -------------------------------
   Certain directories should never be copied into the staging area.

   Examples:
       .vcsGit
       node_modules

   The "continue" statement skips these entries and moves to the next one.


5. Build source and destination paths.
   -----------------------------------
   sourcePath:
       Absolute path of the current file/folder.

   destinationPath:
       Location where the same item should be copied inside staging.

   Since only the current entry name is appended, the original project
   hierarchy is naturally preserved.


6. Check whether the current entry is a directory.
   -----------------------------------------------
   If it is a directory, the function calls itself:

       copyDirectory(sourcePath, destinationPath)

   This is called recursion.

   Every recursive call handles one subdirectory until all nested folders
   have been processed.


7. Copy files.
   -----------
   If the current entry is a file, it is copied directly using:

       fs.copyFile(sourcePath, destinationPath)

   Files represent the base case of recursion because they cannot contain
   any further children.


Recursion Example:
------------------

copyDirectory(controllers)

│
├── add.js
│      │
│      ▼
│   copyFile()
│
├── commit.js
│      │
│      ▼
│   copyFile()
│
└── auth/
       │
       ▼
copyDirectory(auth)
       │
       ├── login.js
       │      │
       │      ▼
       │   copyFile()
       │
       └── signup.js
              │
              ▼
           copyFile()


Time Complexity:
----------------
O(N)

where N is the total number of files and directories being copied.

Every file and directory is visited exactly once.


Space Complexity:
-----------------
O(H)

where H is the maximum depth of the directory tree due to recursive
function calls.


Interview Explanation:
----------------------
This function recursively copies a complete directory while preserving
its folder structure. It first creates the destination directory,
reads all files and subdirectories using fs.readdir() with
withFileTypes: true, skips ignored directories such as .vcsGit and
node_modules, copies files directly using fs.copyFile(), and recursively
calls itself whenever it encounters another directory. This continues
until every nested folder and file has been copied into the staging area.
*/

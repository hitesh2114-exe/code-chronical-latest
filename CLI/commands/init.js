const fs = require("fs").promises; //file system: we can use asynchronous Promise-based operations like await fs.mkdir(...), await fs.writeFile(...)
const path = require("path"); //helps safely construct filesystem paths

async function initRepo(repoName) {
  // process.cwd() returns the directory from which the CLI command was executed.
  const repoPath = path.resolve(process.cwd(), ".vcsGit");

  const commitsPath = path.join(repoPath, "commits");
  const stagingPath = path.join(repoPath, "staging");
  const configPath = path.join(repoPath, "config.json");

  try {
    // fs.access() checks whether .vcsGit already exists to prevent reinitialization.
    try {
      await fs.access(repoPath);
      console.log("Repository is already initialized.");
      return;
    } catch {
      // Repository doesn't exist yet, so initialization can continue.
    }

    // recursive:true also creates the parent .vcsGit directory automatically.
    await fs.mkdir(commitsPath, { recursive: true });
    await fs.mkdir(stagingPath, { recursive: true });

    // Remote storage configuration will be used later by commands such as push/pull.
    const config = {
      storage: "supabase",
      bucket: "codechronicle",
      repoName,
    };

    // JSON.stringify(..., null, 2) converts the object to readable, indented JSON.
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");

    console.log(`Repository '${repoName}' initialized successfully.`);
  } catch (err) {
    console.error("Error initializing repository:", err.message);
  }
}

module.exports = { initRepo };

/*
============================================================
WORKING OF INIT COMMAND
============================================================

The initRepo() function initializes a local Code Chronicle repository.

When the user runs:
    node index.js init <repoName>

1. index.js uses Yargs to detect the "init" command and passes the
   repository name to initRepo(repoName).

2. process.cwd() identifies the directory where the user executed
   the command. This directory is treated as the project root.

3. A hidden ".vcsGit" directory is used to store all metadata related
   to our custom version-control system.

4. Before initialization, fs.access() checks whether ".vcsGit" already
   exists. If it exists, initialization stops to avoid accidentally
   overwriting an existing repository.

5. Two directories are created inside ".vcsGit":

      .vcsGit/
      ├── commits/    -> Stores locally created commits.
      └── staging/    -> Stores files added before they are committed.

6. A config.json file is created to store repository configuration:

      {
        "storage": "supabase",
        "bucket": "codechronicle",
        "repoName": "<repository-name>"
      }

7. At this stage, everything exists only on the local system.
   No files or repository data are uploaded to Supabase.

8. Supabase will act as the remote storage and will be used later
   when commands such as "push" and "pull" are executed.

Overall flow:

CLI Command
    ↓
node index.js init <repoName>
    ↓
Yargs detects "init"
    ↓
initRepo(repoName)
    ↓
Check if .vcsGit already exists
    ↓
Create local VCS structure
    ↓
.vcsGit/
├── commits/
├── staging/
└── config.json

This is conceptually similar to "git init", where Git creates a
.git directory to maintain repository metadata. In Code Chronicle,
.vcsGit serves a similar purpose for our custom version-control system.
============================================================
*/

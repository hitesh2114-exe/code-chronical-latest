const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), ".vcsGit");
  const stagingPath = path.join(repoPath, "staging");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // Ensure that the repository was initialized before committing.
    await fs.access(repoPath);

    const stagedFiles = await fs.readdir(stagingPath);

    // Prevent creating commits when nothing has been staged.
    if (stagedFiles.length === 0) {
      console.log("Nothing to commit. Add files to the staging area first.");
      return;
    }

    // UUID provides a unique identifier for each commit.
    const commitID = uuidv4();
    const commitDir = path.join(commitsPath, commitID);
    await fs.mkdir(commitDir, { recursive: true });

    const configPath = path.join(repoPath, "config.json");
    const config = await getConfig(configPath);
    const lastCommit = config.lastCommit;
    if (lastCommit) {
      const previousCommitPath = path.join(commitsPath, lastCommit);
      await copyPreviousCommit(previousCommitPath, commitDir);
    }

    await copyStagingToCommit(stagingPath, commitDir);

    // Store metadata describing this specific commit.
    const commitMetadata = {
      id: commitID,
      message,
      date: new Date().toISOString(),
    };

    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify(commitMetadata, null, 2),
      "utf-8"
    );

    config.lastCommit = commitID;
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");

    /*
     * Clear staging after a successful commit.
     * rm() removes the old staging directory and mkdir() recreates it empty.
     */
    await fs.rm(stagingPath, {
      recursive: true,
      force: true,
    });

    await fs.mkdir(stagingPath, {
      recursive: true,
    });

    console.log(`Commit ${commitID} created with message: ${message}`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("Repository not initialized. Run the init command first.");
      return;
    }

    console.error("Error during commit:", err.message);
  }
}

async function copyStagingToCommit(stagingPath, commitDir) {
  await fs.mkdir(commitDir, { recursive: true });

  const entries = await fs.readdir(stagingPath, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const sourcePath = path.join(stagingPath, entry.name);
    const destinationPath = path.join(commitDir, entry.name);

    if (entry.isDirectory()) {
      await copyStagingToCommit(sourcePath, destinationPath);
    } else {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
}

async function getConfig(configPath) {
  return JSON.parse(await fs.readFile(configPath, "utf8"));
}

async function copyPreviousCommit(source, destination) {
  await fs.mkdir(destination, { recursive: true });

  const entries = await fs.readdir(source, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (entry.name === "commit.json") {
      continue;
    }

    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyPreviousCommit(sourcePath, destinationPath);
    } else {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
}

module.exports = { commitRepo };

/*
|--------------------------------------------------------------------------
| WORKING OF commitRepo()
|--------------------------------------------------------------------------
|
| The commit command creates a snapshot of the current project state.
| Unlike incremental commits, each commit stores the complete project
| snapshot, making it easy to restore any previous version later.
|
| Workflow:
|
| 1. Verify that the current directory contains an initialized
|    .vcsGit repository.
|
| 2. Check whether the staging area contains any files.
|    If nothing has been staged, the commit is aborted.
|
| 3. Generate a unique commit ID using UUID and create a new
|    directory inside .vcsGit/commits/.
|
| 4. Read config.json to obtain the ID of the previous commit.
|    If a previous commit exists:
|       - Copy its entire snapshot into the new commit directory.
|       - Skip copying commit.json since each commit has its own
|         metadata.
|
| 5. Copy every staged file into the new commit directory.
|    New files are added, while modified files overwrite the older
|    versions copied from the previous snapshot.
|
| 6. Create commit.json containing metadata such as:
|       - Commit ID
|       - Commit message
|       - Timestamp
|
| 7. Update config.json by setting lastCommit to the newly
|    created commit ID so future commits know which snapshot
|    to use as their base.
|
| 8. Clear the staging area by deleting the staging directory
|    and recreating it as an empty folder.
|
| Result:
| Every commit represents a complete snapshot of the repository,
| allowing future commands such as revert, checkout, push, and
| pull to restore project states easily.
|
|--------------------------------------------------------------------------
*/

const fs = require("fs"); //file system
const fsp = require("fs").promises;
const path = require("path");
const { requireAuth } = require("../utils/auth");

async function revertRepo(commitID) {
  requireAuth();
  const repoPath = path.join(process.cwd(), ".chron"); //current working directory
  const commitPath = path.join(repoPath, "commits", commitID); //path to the commit folder

  try {
    try {
      await fsp.access(repoPath);
      // .chron exists
    } catch {
      console.log("Repository not initialized.");
      return;
    }

    // Check whether the commit exists
    if (!fs.existsSync(commitPath)) {
      console.log("Commit not found.");
      return;
    }

    clearProjectRoot(process.cwd());

    const commitItems = fs.readdirSync(commitPath); //read the particular commit folder
    for (const item of commitItems) {
      if (item === "commit.json") {
        // Skip metadata file
        continue;
      }

      const sourcePath = path.join(commitPath, item);
      const destinationPath = path.join(process.cwd(), item);
      const stats = fs.statSync(sourcePath);

      if (stats.isFile()) {
        // Restore file
        fs.copyFileSync(sourcePath, destinationPath);
        console.log(`Restored file: ${item}`);
      } else if (stats.isDirectory()) {
        if (fs.existsSync(destinationPath)) {
          // Restore folder
          fs.rmSync(destinationPath, {
            recursive: true,
            force: true,
          });
        }

        copyDirectory(sourcePath, destinationPath);
        console.log(`Restored folder: ${item}`);

        const commitData = JSON.parse(
          fs.readFileSync(path.join(commitPath, "commit.json"), "utf8")
        );
        const config = JSON.parse(
          fs.readFileSync(path.join(repoPath, "config.json"), "utf8")
        );
        config.lastCommit = commitData.id;

        fs.writeFileSync(
          path.join(repoPath, "config.json"),
          JSON.stringify(config, null, 2)
        );
      }
    }
    console.log("\nRepository reverted successfully.");
  } catch (error) {
    console.log(error);
  }
}

function clearProjectRoot(projectPath) {
  const entries = fs.readdirSync(projectPath, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    // Never delete the .chron directory
    if (entry.name === ".chron") {
      continue;
    }

    const fullPath = path.join(projectPath, entry.name);

    fs.rmSync(fullPath, {
      recursive: true,
      force: true,
    });

    console.log(`Deleted: ${entry.name}`);
  }
}

function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const items = fs.readdirSync(source);

  for (const item of items) {
    if (item === "commit.json") {
      continue;
    }
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);

    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

module.exports = { revertRepo };

const fs = require("fs"); //file system
const path = require("path");
const { requireAuth } = require("../utils/auth");

async function revertRepo(commitID) {
  requireAuth();
  const repoPath = path.join(process.cwd(), ".chron"); //current working directory
  const commitPath = path.join(repoPath, "commits", commitID); //path to the commit folder

  try {
    try {
      await fs.access(repoPath);
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
      }
    }
    console.log("\nRepository reverted successfully.");
  } catch (error) {
    console.log(error);
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

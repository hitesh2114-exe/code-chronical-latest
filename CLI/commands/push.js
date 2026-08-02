const fs = require("fs").promises;
const path = require("path");
const { zipDirectory } = require("../utils/zipDirectory");
const repositoryApi = require("../services/repositoryApi");
const { getToken } = require("../utils/auth");
const { requireAuth } = require("../utils/auth");

async function pushRepo() {
  requireAuth();
  const repoPath = path.resolve(process.cwd(), ".chron");
  const commitsPath = path.join(repoPath, "commits");
  const configPath = path.join(repoPath, "config.json");

  try {
    try {
      await fs.access(repoPath); // .chron exists
    } catch {
      console.log("Repository not initialized.");
      return;
    }
    const config = JSON.parse(await fs.readFile(configPath, "utf8"));
    const { repositoryId, lastCommit, lastPushedCommit } = config;

    if (!lastCommit) {
      console.log("No commits found. Commit your changes before pushing.");
      return;
    }

    if (lastCommit === lastPushedCommit) {
      console.log("Everything is up to date.");
      return;
    }

    const zipPath = path.join(commitsPath, `${lastCommit}.zip`);
    const commitPath = path.join(commitsPath, lastCommit);

    await fs.access(commitPath);
    await zipDirectory(commitPath, zipPath);

    const token = getToken();

    const response = await repositoryApi.pushRepository(
      repositoryId,
      zipPath,
      token
    );

    console.log(response);

    config.lastPushedCommit = lastCommit;
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      console.log("Backend server is not running.");
      return;
    }

    if (!err.response) {
      console.log("Unable to connect. Please check your internet connection.");
      return;
    }

    console.log("problem in pushing...", +err.message);
  }
}

module.exports = { pushRepo };

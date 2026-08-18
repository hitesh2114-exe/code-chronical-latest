const fs = require("fs").promises; //file system
const fswp = require("fs");
const path = require("path");
const supabase = require("../config/supabase");
const { requireAuth } = require("../utils/auth");
const repositoryApi = require("../services/repositoryApi");
const { getToken } = require("../utils/auth");
const { unzipDirectory } = require("../utils/unzipDirectory");

async function pullRepo() {
  let tempDirectory = null;
  try {
    requireAuth(); //checks user logged in or not
    console.log("pulling commits back...");
    const repoPath = path.resolve(process.cwd(), ".chron"); //gives the current directory path
    const configPath = path.join(repoPath, "config.json"); //path to json

    if (!fswp.existsSync(repoPath)) {
      console.log("Repository not initialized.");
      return;
    }

    const config = JSON.parse(await fs.readFile(configPath, "utf8")); //reads the json file
    const { repositoryId } = config; //storing repoId

    if (!repositoryId) {
      console.log("Repository id not found.");
      return;
    }

    const token = getToken(); //get the token
    const latestCommitResponse = await repositoryApi.getLatestCommit(
      repositoryId,
      token
    );
    const latestCommit = latestCommitResponse.data.response;
    console.log("Remote latest commit:", latestCommit);

    const response = await repositoryApi.pullRepository(repositoryId, token); //receive the zip file from backend
    // console.log(response);
    const tempDir = path.join(repoPath, "temp"); //create temporary folder
    tempDirectory = tempDir;
    fswp.mkdirSync(tempDir, { recursive: true });
    const zipPath = path.join(tempDir, "pull.zip");

    const writer = fswp.createWriteStream(zipPath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // console.log("ZIP downloaded successfully.");
    const commitsPath = path.join(repoPath, "commits");

    await unzipDirectory(zipPath, commitsPath);

    // Update local config only after pull succeeds
    config.lastCommit = latestCommit;
    config.lastPushedCommit = latestCommit;

    await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");

    console.log("done");
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      console.log("Backend server is not running.");
      return;
    }
    if (!err.response) {
      console.log("Unable to connect. Please check your internet connection.");
      return;
    }

    console.log("problem in pulling...", +err.message);
   } //finally {
  //   //deleting the temp folder
  //   try {
  //     if (tempDirectory && fswp.existsSync(tempDirectory)) {
  //       fswp.rmSync(tempDirectory, {
  //         recursive: true,
  //         force: true,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err.code);
  //   }
  // }
}

module.exports = { pullRepo };

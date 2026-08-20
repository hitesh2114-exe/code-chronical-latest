const fs = require("fs");
const fsp = require("fs").promises; //file system: we can use asynchronous Promise-based operations like await fs.mkdir(...), await fs.writeFile(...)
const path = require("path");
const { getToken } = require("../utils/auth");
const { requireAuth } = require("../utils/auth");
const repositoryApi = require("../services/repositoryApi");
const { unzipDirectory } = require("../utils/unzipDirectory");

async function cloneRepo(repoId) {
  let tempPath;
  try {
    requireAuth(); //check authentication

    if (!repoId) {
      console.log("Repository ID is required.");
      return;
    }

    //validate repoId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(repoId)) {
      console.log("Invalid repository ID.");
      return;
    }

    //get repository details
    const token = getToken();
    const repo = await repositoryApi.getRepoDetail(repoId, token);
    const repository = repo.data;

    //check for same repo name folder exists
    const targetPath = path.resolve(process.cwd(), repository.name);
    if (fs.existsSync(targetPath)) {
      console.log(`Directory '${repository.name}' already exists.`);
      return;
    }

    fs.mkdirSync(targetPath, { recursive: true }); //create repo folder

    //creating temp folder
    tempPath = path.resolve(targetPath, ".clone-temp");
    fs.mkdirSync(tempPath, { recursive: true });

    //getting the commits to the local folder
    const response = await repositoryApi.cloneRepository(repoId, token);
    const zipPath = path.join(tempPath, "pull.zip");

    const writer = fs.createWriteStream(zipPath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    await unzipDirectory(zipPath, targetPath);
    console.log("done");
  } catch (err) {
    console.error("Error cloning repository:", err.message);
  } finally {
    //deleting the temp folder
    try {
      if (tempPath && fs.existsSync(tempPath)) {
        fs.rmSync(tempPath, {
          recursive: true,
          force: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { cloneRepo };

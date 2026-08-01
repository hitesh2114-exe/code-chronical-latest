const repositoryService = require("../services/repositoryService");
const path = require("path");
const fs = require("fs");
const { unzipDirectory } = require("../utils/unzipDirectory");
const Repository = require("../model/repoModel");

class RepositoryController {
  async createRepository(req, res, next) {
    try {
      //create repo
      const userId = req.user._id;

      const repository = await repositoryService.createRepository(
        userId,
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Repository created successfully.",
        data: {
          repositoryId: repository._id,
          repositoryName: repository.name,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async pushRepository(req, res) {
    try {
      //push repo
      const timestamp = Date.now();
      const uploadDir = path.join(__dirname, "../temp/uploads"); //path to uploads folder
      const extractDir = path.join(
        //path to extracted folder
        __dirname,
        "../temp/extracted",
        `${timestamp}`
      );

      // Create upload directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Save uploaded ZIP temporarily
      const zipPath = path.join(
        uploadDir,
        `${timestamp}-${req.file.originalname}`
      );

      fs.writeFileSync(zipPath, req.file.buffer);

      // Extract the ZIP
      await unzipDirectory(zipPath, extractDir);

      // Verify extraction
      console.log(fs.readdirSync(extractDir));

      const result = await repositoryService.pushRepo({
        repositoryId: req.params.repositoryId,
        userId: req.user._id,
        extractDir,
        uploadDir,
      });

      return res.status(200).json({
        success: true,
        message: "all files are successfully pushed",
      });
    } catch (err) {
      console.log(err);
    }
  }

  //this function is for the pull request
  async pullRepository(req, res) {
    try {
      console.log("reached controller");
      const repositoryId = req.params.repositoryId; //repo id
      const userId = req.user._id; //user id

      const { zipPath, downloadDir } = await repositoryService.pullRepo({
        repositoryId,
        userId,
      });

      return res.download(zipPath, async (err) => {
        if (err) {
          console.log(err);
          return;
        }

        // Delete temporary ZIP
        if (fs.existsSync(zipPath)) {
          fs.unlinkSync(zipPath);
        }
        // Delete downloaded folder
        if (fs.existsSync(downloadDir)) {
          fs.rmSync(downloadDir, {
            recursive: true,
            force: true,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new RepositoryController();

const repositoryService = require("../services/repositoryService");
const path = require("path");
const fs = require("fs");
const { unzipDirectory } = require("../utils/unzipDirectory");
const Repository = require("../model/repoModel");

class RepositoryController {
  async createRepository(req, res, next) {
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

    try {
    } catch (err) {
      next(error);
    }
  }

  async pushRepository(req, res) {
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
  }
}

module.exports = new RepositoryController();

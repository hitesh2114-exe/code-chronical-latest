const express = require("express");
const router = express.Router();

const repositoryController = require("../controllers/repositoryController");
const protect = require("../middleware/authMiddleware");
const isRepositoryOwner = require("../middleware/isRepositoryOwner");
const { validate } = require("../validation/validate");
const {
  createRepositorySchema,
} = require("../validation/schemas/repositorySchema");
const upload = require("../middleware/upload");

//routes for CLI
router.post(
  "/",
  protect,
  validate(createRepositorySchema),
  repositoryController.createRepository
);

router.post(
  "/:repositoryId/push",
  protect,
  upload.single("snapshot"),
  repositoryController.pushRepository
);

router.get("/:repositoryId/pull", protect, repositoryController.pullRepository);

//routes for frontend
router.get("/my", protect, repositoryController.currentUserRepos); //all repos of current user
router.get("/:repoId", repositoryController.getRepoDetail); //get repo in detail
router.get("/:repoId/files", repositoryController.getRepoFiles); //get all files present in the supabase
router.get("/:repoId/file", repositoryController.getRepoFilesContent); //to read file content
router.post(
  "/create",
  protect,
  validate(createRepositorySchema),
  repositoryController.createRepoFromWeb //to create repo from website
);
router.post(
  "/:repoId/upload",
  protect,
  isRepositoryOwner,
  upload.array("files"),
  repositoryController.uploadFolder //used to upload folders form website
);

router.post(
  "/:repoId/upload-files",
  protect,
  isRepositoryOwner,
  upload.array("files"),
  repositoryController.uploadFiles //used to upload files form website
);

router.delete(
  "/:repoId",
  protect,
  isRepositoryOwner,
  repositoryController.deleteRepository //used to upload files form website
);

router.delete(
  "/:repoId/file",
  protect,
  isRepositoryOwner,
  repositoryController.deleteFileOrFolder //used to delete file or folder
);

router.put("/:repoId/file", protect, repositoryController.editFile); //used to edit the file

router.patch(
  "/:repoId",
  protect,
  isRepositoryOwner,
  repositoryController.updateRepository
);

router.get(
  "/:repoId/latest-commit",
  protect,
  isRepositoryOwner,
  repositoryController.getLatestCommit
);

module.exports = router;

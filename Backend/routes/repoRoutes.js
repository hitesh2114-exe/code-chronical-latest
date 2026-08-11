const express = require("express");
const router = express.Router();

const repositoryController = require("../controllers/repositoryController");
const protect = require("../middleware/authMiddleware");
const { validate } = require("../validation/validate");
const {
  createRepositorySchema,
} = require("../validation/schemas/repositorySchema");

const { upload } = require("../middleware/upload");

//routes for CLI
router.post(
  "/",
  protect,
  validate(createRepositorySchema),
  repositoryController.createRepository
);

// router.get("/:repositoryId/sync", protect, repositoryController.returnLatestCommit);
router.post(
  "/:repositoryId/push",
  protect,
  upload.single("snapshot"),
  repositoryController.pushRepository
);

router.get("/:repositoryId/pull", protect, repositoryController.pullRepository);

//routes for frontend
router.get("/my", protect, repositoryController.currentUserRepos); //all repos of current user
router.get("/:repoId", protect, repositoryController.getRepoDetail); //get repo in detail
router.get("/:repoId/files", protect, repositoryController.getRepoFiles);   //get all files present in the supabase
router.get("/:repoId/file", protect, repositoryController.getRepoFilesContent); 

module.exports = router;

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const commitController = require("../controllers/commitController");

router.get("/:repoId", protect, commitController.getCommits);
router.get("/get/:commitId", protect, commitController.getParticularCommit);
router.get("/get/:commitId/file", protect, commitController.readFile);

module.exports = router;
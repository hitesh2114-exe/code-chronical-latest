const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const commitController = require("../controllers/commitController");

router.get("/:repoId", commitController.getCommits);
router.get("/get/:commitId", commitController.getParticularCommit);
router.get("/get/:commitId/file", commitController.readFile);

module.exports = router;
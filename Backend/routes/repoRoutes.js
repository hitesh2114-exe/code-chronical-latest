const express = require("express");
const router = express.Router();

const repositoryController = require("../controllers/repositoryController");
const protect = require("../middleware/authMiddleware");
const { validate } = require("../validation/validate");
const {
  createRepositorySchema,
} = require("../validation/schemas/repositorySchema");

const { upload } = require("../middleware/upload");

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

module.exports = router;

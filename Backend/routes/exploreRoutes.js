const express = require("express");
const router = express.Router();
const exploreController = require("../controllers/exploreController");

router.get("/", exploreController.explore);
router.get("/:userId", exploreController.getUserProfile);

module.exports = router;

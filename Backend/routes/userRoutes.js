const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.put("/bio", protect, userController.updateBio);
router.delete("/me", protect, userController.deleteAccount);

module.exports = router;

//Defines all authentication-related API endpoints for the application.

const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/authValidation");

router.post("/register", registerValidation, authController.registerUser);
router.post("/login", registerValidation, authController.loginUser);
router.get("/me", protect, authController.getProfile);

module.exports = router;

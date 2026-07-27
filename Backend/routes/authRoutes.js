//Defines all authentication-related API endpoints for the application.

const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const {validate} = require("../validation/validate");
const {
  registerSchema,
  loginSchema,
} = require("../validation/schemas/authSchema");

router.post("/register", validate(registerSchema), authController.registerUser);
router.post("/login", validate(loginSchema), authController.loginUser);
router.get("/me", protect, authController.getProfile);

module.exports = router;

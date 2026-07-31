const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const repoRouter = require("./repoRoutes");

router.use("/api/auth", authRouter);
router.use("/api/repositories", repoRouter);

router.get("/", (req, res) => {
  res.send("Welcome to the root");
});

module.exports = router;

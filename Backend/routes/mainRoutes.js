const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const repoRouter = require("./repoRoutes");
const commitRouter = require("./commitRoute");
const exploreRouter = require("./exploreRoutes");
const userRouter = require("./userRoutes");

router.use("/api/auth", authRouter);
router.use("/api/repositories", repoRouter);
router.use("/api/commits", commitRouter);
router.use("/api/explore", exploreRouter);
router.use("/api/users", userRouter);

router.get("/", (req, res) => {
  res.send("Welcome to the root");
});

module.exports = router;

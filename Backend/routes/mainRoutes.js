const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");

router.use("/api/auth", authRouter);

router.get("/", (req, res) => {
  res.send("Welcome to the root");
});

module.exports = router;

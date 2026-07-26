require("dotenv").config({
  path: "../.env",
});

const mongoose = require("mongoose");
const connectDB = require("../config/db");

const User = require("../model/userModel");
const Repository = require("../model/repoModel");
const Commit = require("../model/commitModel");
const Collaborator = require("../model/collaboratorModel");
const Issue = require("../model/issueModel");
const Activity = require("../model/activityModel");

async function seedDatabase() {
  try {
    console.log("Current directory:", process.cwd());
    console.log("MONGO_URI:", process.env.MONGO_URI);

    await connectDB();

    console.log("Clearing old data...");

    await Activity.deleteMany({});
    await Collaborator.deleteMany({});
    await Issue.deleteMany({});
    await Commit.deleteMany({});
    await Repository.deleteMany({});
    await User.deleteMany({});

    console.log("Creating user...");

    const user = await User.create({
      username: "hitesh",
      email: "hitesh@example.com",
      password: "123456",
      bio: "Creator of Code Chronicle",
    });

    console.log("Creating repository...");

    const repo = await Repository.create({
      name: "Code Chronicle",
      description: "Git-inspired version control system",
      visibility: "public",
      owner: user._id,
      storagePath: "repositories/code-chronicle",
    });

    console.log("Creating commit...");

    const commit = await Commit.create({
      commitId: "commit001",
      message: "Initial Commit",
      repository: repo._id,
      author: user._id,
      storagePath: "repositories/code-chronicle/commits/commit001",
    });

    // Update latest commit in repository
    repo.latestCommit = commit._id;
    await repo.save();

    console.log("Creating collaborator...");

    await Collaborator.create({
      repository: repo._id,
      user: user._id,
      role: "owner",
    });

    console.log("Creating issue...");

    await Issue.create({
      title: "Sample Issue",
      description: "This issue is only for testing.",
      repository: repo._id,
      author: user._id,
      assignee: user._id,
    });

    console.log("Creating activity...");

    await Activity.create({
      repository: repo._id,
      user: user._id,
      action: "created_repository",
      description: "Created Code Chronicle repository",
    });

    console.log("Database seeded successfully!");
    console.log("Database:", mongoose.connection.name);

    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedDatabase();

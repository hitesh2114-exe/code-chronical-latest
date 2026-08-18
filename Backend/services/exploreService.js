const Repository = require("../model/repoModel");
const User = require("../model/userModel");

class ExploreService {
  async explore() {
    try {
      const repository = await Repository.find({ visibility: "public" }).select(
        "_id name description visibility owner createdAt updatedAt"
      );
      const users = await User.find().select("_id username avatar bio");
      return {
        repository: repository,
        users: users,
      };
    } catch (err) {
      throw err;
    }
  }

  async getUserProfile(userId) {
    try {
      const user = await User.findById(userId).select(
        "_id username avatar bio"
      );
      const repositories = await Repository.find({
        owner: userId,
        visibility: "public",
      }).select("_id name description visibility owner createdAt updatedAt");
      return { user: user, repositories: repositories };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new ExploreService();

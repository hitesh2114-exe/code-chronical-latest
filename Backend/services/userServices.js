const User = require("../model/userModel");
const Repository = require("../model/repoModel");
const Commit = require("../model/commitModel");
const {
  deleteDirectoryInSupabase,
} = require("../utils/deleteDirectoryInSupabase");

class UserServices {
  async updateBio(userId, message) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { bio: message },
        { new: true, runValidators: true }
      ).select("-password");
      return user;
    } catch (err) {
      throw err;
    }
  }

  async deleteAccount(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new ApiError(404, "User not found.");
      }

      const repositories = await Repository.find({ owner: userId });
      const repositoryIds = repositories.map((repo) => repo._id);

      const route = `repos/${userId}`;
      await deleteDirectoryInSupabase("codechronicle", route);

      // delete all the commits
      await Commit.deleteMany({
        repository: { $in: repositoryIds },
      });

      // delete all the repositories
      await Repository.deleteMany({
        owner: userId,
      });

      //finally delete user
      await User.findByIdAndDelete(userId);

      return { message: "Account deleted successfully." };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UserServices();

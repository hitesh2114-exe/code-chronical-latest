const Repository = require("../model/repoModel");
const ApiError = require("../utils/ApiError");

const isRepositoryOwner = async (req, res, next) => {
  try {
    const { repoId } = req.params;
    const repository = await Repository.findById(repoId);
    if (!repository) {
      throw new ApiError(404, "Repository not found.");
    }
    if (repository.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(
        403,
        "You are not authorized to modify this repository."
      );
    }
    req.repository = repository;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isRepositoryOwner;

const Repository = require("../model/repoModel");
const ApiError = require("../utils/ApiError");

//creating the repository
const createRepository = async (req) => {
  const { name, description, visibility } = req.body;
  const owner = req.user._id;

  //check if repo already exits
  const existingRepository = await Repository.findOne({
    owner,
    name,
  });

  if (existingRepository) {
    throw new ApiError(409, "Repository with this name already exists.");
  }
};

module.exports = {
  createRepository,
};

// This file handles the business logic for user authentication, including user registration, login, password hashing, and JWT generation.

const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");

//Registers a new user after validating uniqueness, hashing the password, and generating a JWT.
const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    if (existingUser.username === username) {
      new ApiError(409, "Username already exists.");
    }

    if (existingUser.email === email) {
      throw new ApiError(409, "Email already exists.");
    }
  }

  // Hash the password before storing it.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user document.
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Generate a JWT for the newly registered user.
  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
    token,
  };
};

// Authenticates a user by verifying the email and password before generating a JWT.
const loginUser = async ({ email, password }) => {
  // Find the user using the provided email.
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Compare the entered password with the stored hash.
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials.");
  }

  // Generate a new JWT after successful authentication.
  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
    token,
  };
};

module.exports = { registerUser, loginUser };

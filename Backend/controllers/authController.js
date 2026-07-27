//Handles incoming authentication requests and sends the appropriate response to the client.

const authService = require("../services/authServices");

//Registers a new user and returns the created user with a JWT.
const registerUser = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Authenticates an existing user and returns a JWT.
const loginUser = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

module.exports = { registerUser, loginUser, getProfile };

//Verifies the JWT sent by the client and attaches the authenticated user to the request object.

const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const ApiError = require("../utils/ApiError");

//Verifies the JWT before allowing access to protected routes.
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authorization token is missing.");
    }

    // Extract the JWT from the Authorization header.
    const token = authHeader.split(" ")[1];

    // Verify the JWT and extract the payload.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the authenticated user.
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    // Attach the authenticated user to the request.
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;

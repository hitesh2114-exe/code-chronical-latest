const ApiError = require("../utils/ApiError");

const validate = (schema) => {
  return (req, res, next) => {
    // Check for an empty request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Missing credentials"));
    }

    // console.log("Validation Middleware");
    const { error } = schema.validate(req.body);

    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }

    next();
  };
};

module.exports = { validate };

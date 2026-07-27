const ApiError = require("../utils/ApiError");

const validate = (schema) => {
  return (req, res, next) => {
    // console.log("Validation Middleware");
    const { error } = schema.validate(req.body);

    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }

    next();
  };
};

module.exports = { validate };

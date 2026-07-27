//Custom error class used to create consistent
//API errors with an HTTP status code and message.

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;

    // Maintain proper stack trace.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;

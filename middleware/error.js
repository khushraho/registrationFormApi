const customError = require("../utills/CustomError");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = false;

  if (error.name === "CastError" && error.kind === "ObjectId") {
    const message = `Resource not found. Invalid ${error.path}: ${error.value}`;
    // const message = `Resource not found. Invalid  ${error.value}`;
    error = new customError(message, 400);
  }

  // Mongoose duplicate key error for register user
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
    error = new customError(message, 400);
  }

  
  return res.status(error.statusCode).json({
    success: error.status,
    message: error.message,
  });
};

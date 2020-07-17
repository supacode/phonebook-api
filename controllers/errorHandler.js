const AppError = require('../utils/AppError');

const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  // eslint-disable-next-line
  console.log(err);

  // Invalid ObjectId
  if (err.name === 'CastError') {
    error = new AppError({
      message: 'Resource not found',
      statusCode: 404,
    });
  }

  // Validation Error
  if (err.name === 'ValidationError') {
    error = new AppError({
      message: Object.values(err.errors).map(errorInner => errorInner.message),
      statusCode: 400,
    });
  }

  // Duplicate values
  if (err.code === 11000) {
    error = new AppError({
      message: 'Duplicate values supplied',
      statusCode: 400,
    });
  }

  res.status(error.statusCode || 500).json({
    status: error.status,
    message: error.message || 'Something went terribly wrong',
  });
};

module.exports = globalErrorHandler;

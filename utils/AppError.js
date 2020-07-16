class AppError extends Error {
  constructor(options = { message: null, statusCode: null }) {
    super();

    this.message = options.message;

    this.statusCode = options.statusCode;

    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

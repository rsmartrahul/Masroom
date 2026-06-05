// Custom error class that inherits from standard Error
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Indicates it is a known operational error

    Error.captureStackTrace(this, this.constructor);
  }
}

// Higher-order function to remove try-catch blocks from controller handlers
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Global error handling middleware for Express
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    // Production Mode: Send clean, client-friendly operational errors
    let error = { ...err };
    error.message = err.message;

    // Handle MongoDB CastError (invalid ObjectId)
    if (err.name === 'CastError') {
      error = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    }

    // Handle MongoDB Duplicate Key Error (code 11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      error = new AppError(`Duplicate field value: "${err.keyValue[field]}". Please use another value!`, 400);
    }

    // Handle Mongoose ValidationError
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((el) => el.message);
      error = new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
    }

    // Handle JWT Errors
    if (err.name === 'JsonWebTokenError') {
      error = new AppError('Invalid token. Please log in again!', 401);
    }
    if (err.name === 'TokenExpiredError') {
      error = new AppError('Your token has expired! Please log in again.', 401);
    }

    res.status(error.statusCode || 500).json({
      status: error.status || 'error',
      message: error.message || 'Something went wrong on the server',
    });
  }
};

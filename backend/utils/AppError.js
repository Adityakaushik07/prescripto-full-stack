// Custom operational error. Throw with an HTTP status code so the
// centralized errorHandler can format a consistent response.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export default AppError;
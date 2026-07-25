// Centralized error handler — mounted as the LAST middleware in server.js.
// Any route that throws or calls next(err) lands here.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
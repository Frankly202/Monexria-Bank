// Wraps an async route handler so rejected promises are forwarded to the
// centralized error handler instead of becoming unhandled rejections.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// 404 handler for unmatched routes.
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// Centralized error handler. Ensures errors are logged (not swallowed) and a
// consistent JSON response is returned. Internal error details are only
// exposed outside of production to avoid leaking implementation details.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  console.error(`[error] ${req.method} ${req.originalUrl} -> ${status}:`, err);

  const body = { error: err.message || 'Internal server error' };

  if (status >= 500 && process.env.NODE_ENV === 'production') {
    body.error = 'Internal server error';
  }

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    body.stack = err.stack;
  }

  res.status(status).json(body);
};

module.exports = { asyncHandler, notFound, errorHandler };

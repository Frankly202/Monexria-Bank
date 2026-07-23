// Wraps an async route handler so thrown errors are caught and returned
// as a 500 response, removing the repeated try/catch block from controllers.
const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = asyncHandler;

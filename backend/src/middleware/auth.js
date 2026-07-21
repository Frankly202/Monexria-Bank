const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // A missing signing secret is a server misconfiguration, not a bad client
  // token. Surface it as a 500 instead of masking it as "invalid token".
  if (!process.env.JWT_SECRET) {
    console.error('[auth] JWT_SECRET is not configured');
    return res.status(500).json({ error: 'Authentication is not configured' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    // Distinguish an expired token from an otherwise invalid one, and log the
    // underlying reason rather than swallowing it silently.
    console.warn(`[auth] token verification failed: ${error.name} - ${error.message}`);
    const message =
      error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
    res.status(401).json({ error: message });
  }
};

const admin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

module.exports = { auth, admin };
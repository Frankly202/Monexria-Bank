const validator = require('validator');

const validateRegister = (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'First and last name required' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin
};
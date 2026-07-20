const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // TODO: Check if user exists in database
    // TODO: Hash password
    // TODO: Create user in database
    // TODO: Send verification email
    
    res.status(201).json({
      message: 'User registered successfully',
      user: { email, firstName, lastName }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Find user in database
    // TODO: Compare password
    // TODO: Generate JWT token
    
    const token = jwt.sign(
      { id: 'userId', role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: { email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  // TODO: Invalidate token (add to blacklist)
  res.json({ message: 'Logged out successfully' });
};

const refreshToken = (req, res) => {
  // TODO: Generate new token
  res.json({ token: 'new_token' });
};

const forgotPassword = (req, res) => {
  // TODO: Generate reset token and send email
  res.json({ message: 'Reset link sent to email' });
};

const resetPassword = (req, res) => {
  // TODO: Verify token and update password
  res.json({ message: 'Password reset successfully' });
};

const verifyEmail = (req, res) => {
  // TODO: Verify email token
  res.json({ message: 'Email verified successfully' });
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail
};
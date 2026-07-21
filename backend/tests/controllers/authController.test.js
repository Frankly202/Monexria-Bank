const jwt = require('jsonwebtoken');
const authController = require('../../src/controllers/authController');
const { mockReq, mockRes } = require('../helpers');

const SECRET = 'test_secret';

beforeEach(() => {
  process.env.JWT_SECRET = SECRET;
  process.env.JWT_EXPIRY = '7d';
});

describe('register', () => {
  test('responds 201 with the submitted user data', async () => {
    const req = mockReq({
      body: { email: 'jane@example.com', password: 'password123', firstName: 'Jane', lastName: 'Doe' },
    });
    const res = mockRes();

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.body).toEqual({
      message: 'User registered successfully',
      user: { email: 'jane@example.com', firstName: 'Jane', lastName: 'Doe' },
    });
  });
});

describe('login', () => {
  test('responds with a signed JWT that encodes the default identity', async () => {
    const req = mockReq({ body: { email: 'jane@example.com', password: 'password123' } });
    const res = mockRes();

    await authController.login(req, res);

    expect(res.body.message).toBe('Login successful');
    expect(res.body.user).toEqual({ email: 'jane@example.com' });
    const decoded = jwt.verify(res.body.token, SECRET);
    expect(decoded.id).toBe('userId');
    expect(decoded.role).toBe('user');
  });

  test('responds 500 when token signing fails', async () => {
    delete process.env.JWT_SECRET;
    const req = mockReq({ body: { email: 'jane@example.com', password: 'password123' } });
    const res = mockRes();

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.body).toHaveProperty('error');
  });
});

describe('stateless auth endpoints', () => {
  test('logout confirms success', () => {
    const res = mockRes();
    authController.logout(mockReq(), res);
    expect(res.body).toEqual({ message: 'Logged out successfully' });
  });

  test('refreshToken returns a token', () => {
    const res = mockRes();
    authController.refreshToken(mockReq(), res);
    expect(res.body).toEqual({ token: 'new_token' });
  });

  test('forgotPassword confirms a reset link was sent', () => {
    const res = mockRes();
    authController.forgotPassword(mockReq(), res);
    expect(res.body).toEqual({ message: 'Reset link sent to email' });
  });

  test('resetPassword confirms success', () => {
    const res = mockRes();
    authController.resetPassword(mockReq(), res);
    expect(res.body).toEqual({ message: 'Password reset successfully' });
  });

  test('verifyEmail confirms success', () => {
    const res = mockRes();
    authController.verifyEmail(mockReq(), res);
    expect(res.body).toEqual({ message: 'Email verified successfully' });
  });
});

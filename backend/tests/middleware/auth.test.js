const jwt = require('jsonwebtoken');
const { auth, admin } = require('../../src/middleware/auth');
const { mockReq, mockRes } = require('../helpers');

const SECRET = 'test_secret';

beforeAll(() => {
  process.env.JWT_SECRET = SECRET;
});

describe('auth middleware', () => {
  test('rejects request with no Authorization header', () => {
    const req = mockReq();
    const res = mockRes();
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.body).toEqual({ error: 'No token provided' });
    expect(next).not.toHaveBeenCalled();
  });

  test('rejects an invalid token', () => {
    const req = mockReq({ headers: { authorization: 'Bearer not-a-real-token' } });
    const res = mockRes();
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.body).toEqual({ error: 'Invalid or expired token' });
    expect(next).not.toHaveBeenCalled();
  });

  test('rejects an expired token', () => {
    const token = jwt.sign({ id: 'u1', role: 'user' }, SECRET, { expiresIn: -10 });
    const req = mockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = mockRes();
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.body).toEqual({ error: 'Invalid or expired token' });
    expect(next).not.toHaveBeenCalled();
  });

  test('accepts a valid token and populates req with user data', () => {
    const token = jwt.sign({ id: 'user-123', role: 'admin' }, SECRET);
    const req = mockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = mockRes();
    const next = jest.fn();

    auth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.userId).toBe('user-123');
    expect(req.userRole).toBe('admin');
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe('admin middleware', () => {
  test('allows through when userRole is admin', () => {
    const req = mockReq({ userRole: 'admin' });
    const res = mockRes();
    const next = jest.fn();

    admin(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('blocks non-admin users with 403', () => {
    const req = mockReq({ userRole: 'user' });
    const res = mockRes();
    const next = jest.fn();

    admin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.body).toEqual({ error: 'Admin access required' });
    expect(next).not.toHaveBeenCalled();
  });

  test('blocks requests with no role', () => {
    const req = mockReq();
    const res = mockRes();
    const next = jest.fn();

    admin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});

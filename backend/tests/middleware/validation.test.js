const { validateRegister, validateLogin } = require('../../src/middleware/validation');
const { mockReq, mockRes } = require('../helpers');

describe('validateRegister', () => {
  const validBody = {
    email: 'jane@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Doe',
  };

  test('calls next for a fully valid body', () => {
    const req = mockReq({ body: { ...validBody } });
    const res = mockRes();
    const next = jest.fn();

    validateRegister(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('rejects a missing email', () => {
    const req = mockReq({ body: { ...validBody, email: undefined } });
    const res = mockRes();
    const next = jest.fn();

    validateRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'Valid email required' });
    expect(next).not.toHaveBeenCalled();
  });

  test('rejects an invalid email format', () => {
    const req = mockReq({ body: { ...validBody, email: 'not-an-email' } });
    const res = mockRes();
    const next = jest.fn();

    validateRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'Valid email required' });
    expect(next).not.toHaveBeenCalled();
  });

  test('rejects a password shorter than 8 characters', () => {
    const req = mockReq({ body: { ...validBody, password: 'short' } });
    const res = mockRes();
    const next = jest.fn();

    validateRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'Password must be at least 8 characters' });
    expect(next).not.toHaveBeenCalled();
  });

  test('rejects a missing password', () => {
    const req = mockReq({ body: { ...validBody, password: undefined } });
    const res = mockRes();
    const next = jest.fn();

    validateRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'Password must be at least 8 characters' });
  });

  test('rejects a missing first name', () => {
    const req = mockReq({ body: { ...validBody, firstName: '' } });
    const res = mockRes();
    const next = jest.fn();

    validateRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'First and last name required' });
    expect(next).not.toHaveBeenCalled();
  });

  test('rejects a missing last name', () => {
    const req = mockReq({ body: { ...validBody, lastName: '' } });
    const res = mockRes();
    const next = jest.fn();

    validateRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'First and last name required' });
  });
});

describe('validateLogin', () => {
  test('calls next when email and password are present', () => {
    const req = mockReq({ body: { email: 'a@b.com', password: 'secret' } });
    const res = mockRes();
    const next = jest.fn();

    validateLogin(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('rejects a missing email', () => {
    const req = mockReq({ body: { password: 'secret' } });
    const res = mockRes();
    const next = jest.fn();

    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'Email and password required' });
    expect(next).not.toHaveBeenCalled();
  });

  test('rejects a missing password', () => {
    const req = mockReq({ body: { email: 'a@b.com' } });
    const res = mockRes();
    const next = jest.fn();

    validateLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'Email and password required' });
    expect(next).not.toHaveBeenCalled();
  });
});

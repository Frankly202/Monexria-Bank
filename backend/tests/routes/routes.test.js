const request = require('supertest');
const jwt = require('jsonwebtoken');
const { buildApp } = require('../helpers');

const SECRET = 'test_secret';
beforeAll(() => {
  process.env.JWT_SECRET = SECRET;
  process.env.JWT_EXPIRY = '7d';
});

const userToken = () => jwt.sign({ id: 'u1', role: 'user' }, SECRET);
const adminToken = () => jwt.sign({ id: 'a1', role: 'admin' }, SECRET);

describe('auth routes', () => {
  const app = buildApp('/api/auth', require('../../src/routes/authRoutes'));

  test('POST /register runs validation then the controller', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'jane@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  test('POST /register is blocked by validation on bad input', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'bad' });
    expect(res.status).toBe(400);
  });

  test('POST /login returns a token', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'a@b.com', password: 'pw' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('GET /verify/:token succeeds', async () => {
    const res = await request(app).get('/api/auth/verify/sometoken');
    expect(res.status).toBe(200);
  });
});

describe('currency routes (mixed public/protected)', () => {
  const app = buildApp('/api/currencies', require('../../src/routes/currencyRoutes'));

  test('GET /rates is public', async () => {
    const res = await request(app).get('/api/currencies/rates');
    expect(res.status).toBe(200);
    expect(res.body.rates).toBeDefined();
  });

  test('POST /convert requires auth', async () => {
    const res = await request(app).post('/api/currencies/convert').send({ amount: 10 });
    expect(res.status).toBe(401);
  });

  test('POST /convert works with a valid token', async () => {
    const res = await request(app)
      .post('/api/currencies/convert')
      .set('Authorization', `Bearer ${userToken()}`)
      .send({ amount: 10, fromCurrency: 'USD', toCurrency: 'EUR' });
    expect(res.status).toBe(200);
    expect(res.body.convertedAmount).toBeCloseTo(9.2);
  });
});

describe('account routes', () => {
  const app = buildApp('/api/accounts', require('../../src/routes/accountRoutes'));

  test('GET / requires auth', async () => {
    const res = await request(app).get('/api/accounts');
    expect(res.status).toBe(401);
  });

  test('GET / returns accounts with a valid token', async () => {
    const res = await request(app).get('/api/accounts').set('Authorization', `Bearer ${userToken()}`);
    expect(res.status).toBe(200);
    expect(res.body.accounts).toBeDefined();
  });
});

describe('transaction routes', () => {
  const app = buildApp('/api/transactions', require('../../src/routes/transactionRoutes'));

  test('POST /deposit requires auth', async () => {
    const res = await request(app).post('/api/transactions/deposit').send({ amount: 1 });
    expect(res.status).toBe(401);
  });

  test('POST /deposit succeeds with a valid token', async () => {
    const res = await request(app)
      .post('/api/transactions/deposit')
      .set('Authorization', `Bearer ${userToken()}`)
      .send({ accountId: 1, amount: 100, currency: 'USD' });
    expect(res.status).toBe(201);
  });
});

describe('user routes', () => {
  const app = buildApp('/api/users', require('../../src/routes/userRoutes'));

  test('GET /profile requires auth', async () => {
    const res = await request(app).get('/api/users/profile');
    expect(res.status).toBe(401);
  });

  test('GET /profile returns the authenticated user id', async () => {
    const res = await request(app).get('/api/users/profile').set('Authorization', `Bearer ${userToken()}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('u1');
  });
});

describe('admin routes (auth + admin guard)', () => {
  const app = buildApp('/api/admin', require('../../src/routes/adminRoutes'));

  test('GET /dashboard rejects unauthenticated requests', async () => {
    const res = await request(app).get('/api/admin/dashboard');
    expect(res.status).toBe(401);
  });

  test('GET /dashboard rejects non-admin tokens with 403', async () => {
    const res = await request(app).get('/api/admin/dashboard').set('Authorization', `Bearer ${userToken()}`);
    expect(res.status).toBe(403);
  });

  test('GET /dashboard succeeds for admin tokens', async () => {
    const res = await request(app).get('/api/admin/dashboard').set('Authorization', `Bearer ${adminToken()}`);
    expect(res.status).toBe(200);
    expect(res.body.dashboard).toBeDefined();
  });
});

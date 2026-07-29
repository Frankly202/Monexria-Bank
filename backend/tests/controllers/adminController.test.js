const adminController = require('../../src/controllers/adminController');
const { mockReq, mockRes } = require('../helpers');

describe('getDashboard', () => {
  test('returns aggregate platform metrics', async () => {
    const res = mockRes();
    await adminController.getDashboard(mockReq(), res);

    expect(res.body.dashboard).toEqual({
      totalUsers: 1500,
      activeAccounts: 2800,
      totalTransactions: 25000,
      totalBalance: 5000000,
      dailyRevenue: 50000,
    });
  });
});

describe('getAllUsers', () => {
  test('returns a list of users', async () => {
    const res = mockRes();
    await adminController.getAllUsers(mockReq(), res);

    expect(res.body.users).toHaveLength(2);
    expect(res.body.users[0]).toHaveProperty('email');
  });
});

describe('getUserDetails', () => {
  test('echoes the userId param', async () => {
    const req = mockReq({ params: { userId: '99' } });
    const res = mockRes();

    await adminController.getUserDetails(req, res);

    expect(res.body.user.id).toBe('99');
  });
});

describe('suspendUser', () => {
  test('confirms suspension', async () => {
    const res = mockRes();
    await adminController.suspendUser(mockReq(), res);
    expect(res.body).toEqual({ message: 'User suspended successfully' });
  });
});

describe('activateUser', () => {
  test('confirms activation', async () => {
    const res = mockRes();
    await adminController.activateUser(mockReq(), res);
    expect(res.body).toEqual({ message: 'User activated successfully' });
  });
});

describe('getAllTransactions', () => {
  test('returns all transactions', async () => {
    const res = mockRes();
    await adminController.getAllTransactions(mockReq(), res);

    expect(res.body.transactions).toHaveLength(2);
    expect(res.body.transactions[0]).toHaveProperty('userId');
  });
});

describe('getDailyReport', () => {
  test("returns today's report with an ISO date", async () => {
    const res = mockRes();
    await adminController.getDailyReport(mockReq(), res);

    expect(res.body.report.date).toBe(new Date().toISOString().split('T')[0]);
    expect(res.body.report).toHaveProperty('revenue', 50000);
  });
});

describe('getMonthlyReport', () => {
  test('returns the monthly report', async () => {
    const res = mockRes();
    await adminController.getMonthlyReport(mockReq(), res);

    expect(res.body.report).toMatchObject({ month: 'July 2024', transactions: 15000 });
  });
});

describe('updateSettings', () => {
  test('confirms settings were updated', async () => {
    const res = mockRes();
    await adminController.updateSettings(mockReq(), res);
    expect(res.body).toEqual({ message: 'Settings updated successfully' });
  });
});

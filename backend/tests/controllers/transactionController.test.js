const transactionController = require('../../src/controllers/transactionController');
const { mockReq, mockRes } = require('../helpers');

describe('getTransactions', () => {
  test('returns a list of transactions', async () => {
    const res = mockRes();
    await transactionController.getTransactions(mockReq(), res);

    expect(res.body.transactions).toHaveLength(2);
    expect(res.body.transactions[0]).toMatchObject({ type: 'Deposit', status: 'completed' });
  });
});

describe('deposit', () => {
  test('responds 201 marking a completed deposit with the given amount', async () => {
    const req = mockReq({ body: { accountId: 1, amount: 250, currency: 'USD' } });
    const res = mockRes();

    await transactionController.deposit(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.body.message).toBe('Deposit successful');
    expect(res.body.transaction).toMatchObject({
      type: 'Deposit',
      amount: 250,
      currency: 'USD',
      status: 'completed',
    });
  });
});

describe('withdraw', () => {
  test('responds 201 marking a pending withdrawal', async () => {
    const req = mockReq({ body: { accountId: 1, amount: 75, currency: 'EUR' } });
    const res = mockRes();

    await transactionController.withdraw(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.body.message).toBe('Withdrawal initiated');
    expect(res.body.transaction).toMatchObject({ type: 'Withdrawal', amount: 75, status: 'pending' });
  });
});

describe('transfer', () => {
  test('responds 201 marking a pending transfer', async () => {
    const req = mockReq({
      body: { fromAccountId: 1, toAccountId: 2, amount: 500, currency: 'USD' },
    });
    const res = mockRes();

    await transactionController.transfer(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.body.message).toBe('Transfer initiated');
    expect(res.body.transaction).toMatchObject({ type: 'Transfer', amount: 500, status: 'pending' });
  });
});

describe('getTransaction', () => {
  test('echoes the transactionId param', async () => {
    const req = mockReq({ params: { transactionId: 'txn-9' } });
    const res = mockRes();

    await transactionController.getTransaction(req, res);

    expect(res.body.id).toBe('txn-9');
    expect(res.body.date).toBeInstanceOf(Date);
  });
});

describe('getTransactionHistory', () => {
  test('returns history entries', async () => {
    const res = mockRes();
    await transactionController.getTransactionHistory(mockReq(), res);
    expect(res.body.history).toHaveLength(2);
  });
});

describe('cancelTransaction', () => {
  test('confirms cancellation', async () => {
    const res = mockRes();
    await transactionController.cancelTransaction(mockReq(), res);
    expect(res.body).toEqual({ message: 'Transaction cancelled successfully' });
  });
});

describe('getMonthlyAnalytics', () => {
  test('returns aggregated analytics figures', async () => {
    const res = mockRes();
    await transactionController.getMonthlyAnalytics(mockReq(), res);

    expect(res.body.analytics).toEqual({
      totalDeposits: 5000,
      totalWithdrawals: 2000,
      totalTransfers: 1500,
      transactionCount: 10,
    });
  });
});

const accountController = require('../../src/controllers/accountController');
const { mockReq, mockRes } = require('../helpers');

describe('getAccounts', () => {
  test('returns the list of accounts', async () => {
    const res = mockRes();
    await accountController.getAccounts(mockReq(), res);

    expect(res.body.accounts).toHaveLength(2);
    expect(res.body.accounts[0]).toMatchObject({ type: 'Checking', currency: 'USD', active: true });
  });
});

describe('createAccount', () => {
  test('responds 201 echoing accountType and currency with a zero balance', async () => {
    const req = mockReq({ body: { accountType: 'Savings', currency: 'EUR' } });
    const res = mockRes();

    await accountController.createAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.body).toEqual({
      message: 'Account created successfully',
      account: { id: 3, accountType: 'Savings', currency: 'EUR', balance: 0 },
    });
  });
});

describe('getAccountDetails', () => {
  test('echoes the accountId param in the details', async () => {
    const req = mockReq({ params: { accountId: '42' } });
    const res = mockRes();

    await accountController.getAccountDetails(req, res);

    expect(res.body.id).toBe('42');
    expect(res.body.accountNumber).toBe('****1234');
    expect(res.body.createdAt).toBeInstanceOf(Date);
  });
});

describe('getBalance', () => {
  test('returns balance and currency', async () => {
    const req = mockReq({ params: { accountId: '1' } });
    const res = mockRes();

    await accountController.getBalance(req, res);

    expect(res.body).toEqual({ balance: 5000, currency: 'USD' });
  });
});

describe('updateAccount', () => {
  test('confirms the account was updated', async () => {
    const res = mockRes();
    await accountController.updateAccount(mockReq(), res);
    expect(res.body).toEqual({ message: 'Account updated successfully' });
  });
});

describe('closeAccount', () => {
  test('confirms the account was closed', async () => {
    const res = mockRes();
    await accountController.closeAccount(mockReq(), res);
    expect(res.body).toEqual({ message: 'Account closed successfully' });
  });
});

describe('getStatement', () => {
  test('returns statement line items', async () => {
    const res = mockRes();
    await accountController.getStatement(mockReq(), res);

    expect(res.body.statement).toHaveLength(2);
    expect(res.body.statement[0]).toMatchObject({ description: 'Deposit', amount: 1000 });
  });
});

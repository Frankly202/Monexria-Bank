const asyncHandler = require('../utils/asyncHandler');

const getAccounts = asyncHandler(async (req, res) => {
  res.json({
    accounts: [
      { id: 1, type: 'Checking', balance: 5000, currency: 'USD', active: true },
      { id: 2, type: 'Savings', balance: 10000, currency: 'USD', active: true }
    ]
  });
});

const createAccount = asyncHandler(async (req, res) => {
  const { accountType, currency } = req.body;
  res.status(201).json({
    message: 'Account created successfully',
    account: { id: 3, accountType, currency, balance: 0 }
  });
});

const getAccountDetails = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  res.json({
    id: accountId,
    type: 'Checking',
    balance: 5000,
    currency: 'USD',
    accountNumber: '****1234',
    createdAt: new Date()
  });
});

const getBalance = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  res.json({ balance: 5000, currency: 'USD' });
});

const updateAccount = asyncHandler(async (req, res) => {
  res.json({ message: 'Account updated successfully' });
});

const closeAccount = asyncHandler(async (req, res) => {
  res.json({ message: 'Account closed successfully' });
});

const getStatement = asyncHandler(async (req, res) => {
  res.json({
    statement: [
      { date: new Date(), description: 'Deposit', amount: 1000, balance: 6000 },
      { date: new Date(), description: 'Withdrawal', amount: 500, balance: 5500 }
    ]
  });
});

module.exports = {
  getAccounts,
  createAccount,
  getAccountDetails,
  getBalance,
  updateAccount,
  closeAccount,
  getStatement
};

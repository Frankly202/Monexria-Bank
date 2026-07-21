const asyncHandler = require('../utils/asyncHandler');

const getTransactions = asyncHandler(async (req, res) => {
  res.json({
    transactions: [
      { id: 1, type: 'Deposit', amount: 1000, date: new Date(), status: 'completed' },
      { id: 2, type: 'Transfer', amount: 500, date: new Date(), status: 'pending' }
    ]
  });
});

const deposit = asyncHandler(async (req, res) => {
  const { accountId, amount, currency } = req.body;
  res.status(201).json({
    message: 'Deposit successful',
    transaction: { id: 1, type: 'Deposit', amount, currency, status: 'completed' }
  });
});

const withdraw = asyncHandler(async (req, res) => {
  const { accountId, amount, currency } = req.body;
  res.status(201).json({
    message: 'Withdrawal initiated',
    transaction: { id: 2, type: 'Withdrawal', amount, currency, status: 'pending' }
  });
});

const transfer = asyncHandler(async (req, res) => {
  const { fromAccountId, toAccountId, amount, currency } = req.body;
  res.status(201).json({
    message: 'Transfer initiated',
    transaction: { id: 3, type: 'Transfer', amount, currency, status: 'pending' }
  });
});

const getTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  res.json({
    id: transactionId,
    type: 'Transfer',
    amount: 500,
    currency: 'USD',
    status: 'completed',
    date: new Date()
  });
});

const getTransactionHistory = asyncHandler(async (req, res) => {
  res.json({
    history: [
      { date: new Date(), description: 'Deposit', amount: 1000 },
      { date: new Date(), description: 'Transfer', amount: 500 }
    ]
  });
});

const cancelTransaction = asyncHandler(async (req, res) => {
  res.json({ message: 'Transaction cancelled successfully' });
});

const getMonthlyAnalytics = asyncHandler(async (req, res) => {
  res.json({
    analytics: {
      totalDeposits: 5000,
      totalWithdrawals: 2000,
      totalTransfers: 1500,
      transactionCount: 10
    }
  });
});

module.exports = {
  getTransactions,
  deposit,
  withdraw,
  transfer,
  getTransaction,
  getTransactionHistory,
  cancelTransaction,
  getMonthlyAnalytics
};

const asyncHandler = require('../utils/asyncHandler');

const getDashboard = asyncHandler(async (req, res) => {
  res.json({
    dashboard: {
      totalUsers: 1500,
      activeAccounts: 2800,
      totalTransactions: 25000,
      totalBalance: 5000000,
      dailyRevenue: 50000
    }
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' }
    ]
  });
});

const getUserDetails = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  res.json({
    user: { id: userId, name: 'John Doe', email: 'john@example.com', status: 'active' }
  });
});

const suspendUser = asyncHandler(async (req, res) => {
  res.json({ message: 'User suspended successfully' });
});

const activateUser = asyncHandler(async (req, res) => {
  res.json({ message: 'User activated successfully' });
});

const getAllTransactions = asyncHandler(async (req, res) => {
  res.json({
    transactions: [
      { id: 1, userId: 1, amount: 1000, type: 'Deposit', status: 'completed' },
      { id: 2, userId: 2, amount: 500, type: 'Transfer', status: 'pending' }
    ]
  });
});

const getDailyReport = asyncHandler(async (req, res) => {
  res.json({
    report: {
      date: new Date().toISOString().split('T')[0],
      transactions: 500,
      revenue: 50000,
      newUsers: 25
    }
  });
});

const getMonthlyReport = asyncHandler(async (req, res) => {
  res.json({
    report: {
      month: 'July 2024',
      transactions: 15000,
      revenue: 1500000,
      newUsers: 750
    }
  });
});

const updateSettings = asyncHandler(async (req, res) => {
  res.json({ message: 'Settings updated successfully' });
});

module.exports = {
  getDashboard,
  getAllUsers,
  getUserDetails,
  suspendUser,
  activateUser,
  getAllTransactions,
  getDailyReport,
  getMonthlyReport,
  updateSettings
};

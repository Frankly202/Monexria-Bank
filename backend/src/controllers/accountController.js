const getAccounts = async (req, res) => {
  try {
    res.json({
      accounts: [
        { id: 1, type: 'Checking', balance: 5000, currency: 'USD', active: true },
        { id: 2, type: 'Savings', balance: 10000, currency: 'USD', active: true }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const { accountType, currency } = req.body;
    res.status(201).json({
      message: 'Account created successfully',
      account: { id: 3, accountType, currency, balance: 0 }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountDetails = async (req, res) => {
  try {
    const { accountId } = req.params;
    res.json({
      id: accountId,
      type: 'Checking',
      balance: 5000,
      currency: 'USD',
      accountNumber: '****1234',
      createdAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBalance = async (req, res) => {
  try {
    const { accountId } = req.params;
    res.json({ balance: 5000, currency: 'USD' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    res.json({ message: 'Account updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const closeAccount = async (req, res) => {
  try {
    res.json({ message: 'Account closed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStatement = async (req, res) => {
  try {
    res.json({
      statement: [
        { date: new Date(), description: 'Deposit', amount: 1000, balance: 6000 },
        { date: new Date(), description: 'Withdrawal', amount: 500, balance: 5500 }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAccounts,
  createAccount,
  getAccountDetails,
  getBalance,
  updateAccount,
  closeAccount,
  getStatement
};
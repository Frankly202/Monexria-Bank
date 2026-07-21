const getTransactions = async (req, res) => {
  try {
    res.json({
      transactions: [
        { id: 1, type: 'Deposit', amount: 1000, date: new Date(), status: 'completed' },
        { id: 2, type: 'Transfer', amount: 500, date: new Date(), status: 'pending' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deposit = async (req, res) => {
  try {
    const { accountId, amount, currency } = req.body;
    res.status(201).json({
      message: 'Deposit successful',
      transaction: { id: 1, type: 'Deposit', amount, currency, status: 'completed' }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const withdraw = async (req, res) => {
  try {
    const { accountId, amount, currency } = req.body;
    res.status(201).json({
      message: 'Withdrawal initiated',
      transaction: { id: 2, type: 'Withdrawal', amount, currency, status: 'pending' }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const transfer = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount, currency } = req.body;
    res.status(201).json({
      message: 'Transfer initiated',
      transaction: { id: 3, type: 'Transfer', amount, currency, status: 'pending' }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    res.json({
      id: transactionId,
      type: 'Transfer',
      amount: 500,
      currency: 'USD',
      status: 'completed',
      date: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    res.json({
      history: [
        { date: new Date(), description: 'Deposit', amount: 1000 },
        { date: new Date(), description: 'Transfer', amount: 500 }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelTransaction = async (req, res) => {
  try {
    res.json({ message: 'Transaction cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMonthlyAnalytics = async (req, res) => {
  try {
    res.json({
      analytics: {
        totalDeposits: 5000,
        totalWithdrawals: 2000,
        totalTransfers: 1500,
        transactionCount: 10
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Banks a customer can send money to. Spans multiple locations so "easy
// access" transfers to other banks are available everywhere.
const SUPPORTED_BANKS = [
  { code: 'CHASE_US', name: 'Chase Bank', country: 'United States', type: 'domestic' },
  { code: 'BOA_US', name: 'Bank of America', country: 'United States', type: 'domestic' },
  { code: 'WELLS_US', name: 'Wells Fargo', country: 'United States', type: 'domestic' },
  { code: 'HSBC_UK', name: 'HSBC', country: 'United Kingdom', type: 'international' },
  { code: 'BARCLAYS_UK', name: 'Barclays', country: 'United Kingdom', type: 'international' },
  { code: 'DEUTSCHE_DE', name: 'Deutsche Bank', country: 'Germany', type: 'international' },
  { code: 'BNP_FR', name: 'BNP Paribas', country: 'France', type: 'international' },
  { code: 'GTB_NG', name: 'Guaranty Trust Bank', country: 'Nigeria', type: 'international' },
  { code: 'KCB_KE', name: 'Kenya Commercial Bank', country: 'Kenya', type: 'international' },
  { code: 'ICICI_IN', name: 'ICICI Bank', country: 'India', type: 'international' },
  { code: 'DBS_SG', name: 'DBS Bank', country: 'Singapore', type: 'international' },
  { code: 'RBC_CA', name: 'Royal Bank of Canada', country: 'Canada', type: 'international' }
];

const getSupportedBanks = async (req, res) => {
  try {
    res.json({ banks: SUPPORTED_BANKS });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Shared validation for a transfer amount. Returns an error string, or null
// when the amount is valid.
const validateAmount = (amount) => {
  const numeric = Number(amount);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return 'A positive amount is required';
  }
  return null;
};

const generateReference = (prefix) =>
  `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

// Transfer between two Monexria accounts.
const localTransfer = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount, currency = 'USD' } = req.body;

    if (!fromAccountId || !toAccountId) {
      return res.status(400).json({ error: 'fromAccountId and toAccountId are required' });
    }
    if (fromAccountId === toAccountId) {
      return res.status(400).json({ error: 'Cannot transfer to the same account' });
    }
    const amountError = validateAmount(amount);
    if (amountError) {
      return res.status(400).json({ error: amountError });
    }

    res.status(201).json({
      message: 'Local transfer completed',
      transaction: {
        id: generateReference('LCL'),
        type: 'LocalTransfer',
        fromAccountId,
        toAccountId,
        amount: Number(amount),
        currency,
        status: 'completed'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Transfer to an account at another bank (domestic or international).
const interbankTransfer = async (req, res) => {
  try {
    const { fromAccountId, bankCode, recipientAccount, recipientName, amount, currency = 'USD' } = req.body;

    if (!fromAccountId || !bankCode || !recipientAccount || !recipientName) {
      return res.status(400).json({
        error: 'fromAccountId, bankCode, recipientAccount and recipientName are required'
      });
    }
    const bank = SUPPORTED_BANKS.find((b) => b.code === bankCode);
    if (!bank) {
      return res.status(400).json({ error: `Unsupported bank: ${bankCode}` });
    }
    const amountError = validateAmount(amount);
    if (amountError) {
      return res.status(400).json({ error: amountError });
    }

    res.status(201).json({
      message: `Transfer to ${bank.name} initiated`,
      transaction: {
        id: generateReference('IBK'),
        type: 'InterbankTransfer',
        fromAccountId,
        bank: { code: bank.code, name: bank.name, country: bank.country },
        recipientAccount,
        recipientName,
        amount: Number(amount),
        currency,
        status: 'pending'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cross-border transfer requiring a SWIFT/BIC code and destination country.
const internationalTransfer = async (req, res) => {
  try {
    const {
      fromAccountId,
      swiftCode,
      recipientAccount,
      recipientName,
      country,
      amount,
      currency
    } = req.body;

    if (!fromAccountId || !swiftCode || !recipientAccount || !recipientName || !country) {
      return res.status(400).json({
        error: 'fromAccountId, swiftCode, recipientAccount, recipientName and country are required'
      });
    }
    if (!currency) {
      return res.status(400).json({ error: 'currency is required for international transfers' });
    }
    const amountError = validateAmount(amount);
    if (amountError) {
      return res.status(400).json({ error: amountError });
    }

    const numericAmount = Number(amount);
    const fee = Number((numericAmount * 0.015 + 5).toFixed(2)); // 1.5% + flat fee

    res.status(201).json({
      message: 'International transfer initiated',
      transaction: {
        id: generateReference('INT'),
        type: 'InternationalTransfer',
        fromAccountId,
        swiftCode,
        recipientAccount,
        recipientName,
        country,
        amount: numericAmount,
        currency,
        fee,
        totalDebited: Number((numericAmount + fee).toFixed(2)),
        estimatedArrival: '1-3 business days',
        status: 'pending'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTransactions,
  deposit,
  withdraw,
  transfer,
  getTransaction,
  getTransactionHistory,
  cancelTransaction,
  getMonthlyAnalytics,
  getSupportedBanks,
  localTransfer,
  interbankTransfer,
  internationalTransfer
};
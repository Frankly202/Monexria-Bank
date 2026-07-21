const getDashboard = async (req, res) => {
  try {
    res.json({
      dashboard: {
        totalUsers: 1500,
        activeAccounts: 2800,
        totalTransactions: 25000,
        totalBalance: 5000000,
        dailyRevenue: 50000
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    res.json({
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    res.json({
      user: { id: userId, name: 'John Doe', email: 'john@example.com', status: 'active' }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const suspendUser = async (req, res) => {
  try {
    res.json({ message: 'User suspended successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const activateUser = async (req, res) => {
  try {
    res.json({ message: 'User activated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    res.json({
      transactions: [
        { id: 1, userId: 1, amount: 1000, type: 'Deposit', status: 'completed' },
        { id: 2, userId: 2, amount: 500, type: 'Transfer', status: 'pending' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDailyReport = async (req, res) => {
  try {
    res.json({
      report: {
        date: new Date().toISOString().split('T')[0],
        transactions: 500,
        revenue: 50000,
        newUsers: 25
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMonthlyReport = async (req, res) => {
  try {
    res.json({
      report: {
        month: 'July 2024',
        transactions: 15000,
        revenue: 1500000,
        newUsers: 750
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rule-based customer-service assistant. Intent is matched on keywords so it
// works with no external LLM key; a real model can be plugged in later behind
// the same request/response contract.
const SUPPORT_INTENTS = [
  {
    keywords: ['transfer', 'send money', 'send funds', 'wire'],
    reply:
      'You can send money from the Transfers page. Choose Local for Monexria-to-Monexria, ' +
      'Other Banks for domestic/interbank transfers, or International for cross-border SWIFT transfers.'
  },
  {
    keywords: ['exchange', 'convert', 'currency', 'rate', 'forex'],
    reply:
      'Head to the Currency Exchange page to convert between 40+ currencies. ' +
      'Live rates are shown and the converter previews the amount before you confirm.'
  },
  {
    keywords: ['card', 'debit', 'credit', 'block card', 'lost card'],
    reply:
      'To manage or freeze a card, open Profile > Cards. If a card is lost, freeze it there ' +
      'immediately and request a replacement — funds are protected once frozen.'
  },
  {
    keywords: ['password', 'reset', 'login', 'locked', 'forgot'],
    reply:
      'For login issues, use "Forgot password" on the login screen to receive a reset link. ' +
      'Accounts unlock automatically after a short cooldown.'
  },
  {
    keywords: ['fee', 'charge', 'cost', 'commission'],
    reply:
      'Local transfers are free. International transfers carry a 1.5% + $5 fee, previewed before you confirm.'
  },
  {
    keywords: ['balance', 'account', 'statement'],
    reply:
      'Your balances are on the Dashboard, and detailed statements are available per account on the Accounts page.'
  }
];

const supportChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A non-empty message is required' });
    }

    const text = message.toLowerCase();
    const matched = SUPPORT_INTENTS.find((intent) =>
      intent.keywords.some((kw) => text.includes(kw))
    );

    const reply = matched
      ? matched.reply
      : "I'm not fully sure about that yet. I can help with transfers, currency exchange, " +
        'cards, login/password, fees, and balances. Could you rephrase, or would you like me ' +
        'to connect you to a human agent?';

    res.json({
      reply,
      intent: matched ? matched.keywords[0] : 'fallback',
      escalate: !matched,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Snapshot of live customer-care activity for the admin dashboard chart.
// Values vary per request to simulate a live feed.
const getSupportStats = async (req, res) => {
  try {
    const now = new Date();
    const timeline = Array.from({ length: 12 }, (_, i) => {
      const t = new Date(now.getTime() - (11 - i) * 5 * 60 * 1000);
      return {
        time: t.toISOString(),
        label: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        activeChats: Math.floor(Math.random() * 40) + 10,
        resolved: Math.floor(Math.random() * 30) + 5
      };
    });

    res.json({
      summary: {
        activeChats: timeline[timeline.length - 1].activeChats,
        waitingInQueue: Math.floor(Math.random() * 15),
        resolvedToday: 480 + Math.floor(Math.random() * 60),
        avgResponseSeconds: 30 + Math.floor(Math.random() * 60),
        aiHandledPercent: 60 + Math.floor(Math.random() * 25)
      },
      timeline,
      timestamp: now
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSupportTickets = async (req, res) => {
  try {
    res.json({
      tickets: [
        { id: 'T-1042', customer: 'John Doe', subject: 'International transfer delay', priority: 'high', status: 'open', assignedTo: 'AI Assistant' },
        { id: 'T-1043', customer: 'Jane Smith', subject: 'Currency conversion question', priority: 'low', status: 'resolved', assignedTo: 'AI Assistant' },
        { id: 'T-1044', customer: 'Amara Okafor', subject: 'Card frozen unexpectedly', priority: 'medium', status: 'open', assignedTo: 'Agent: Lisa' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboard,
  getAllUsers,
  getUserDetails,
  suspendUser,
  activateUser,
  getAllTransactions,
  getDailyReport,
  getMonthlyReport,
  updateSettings,
  supportChat,
  getSupportStats,
  getSupportTickets
};
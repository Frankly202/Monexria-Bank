const getExchangeRates = async (req, res) => {
  try {
    res.json({
      rates: {
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 149.5,
        CAD: 1.36,
        AUD: 1.52,
        INR: 83.1
      },
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSupportedCurrencies = async (req, res) => {
  try {
    res.json({
      currencies: [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const convertCurrency = async (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;
    const convertedAmount = amount * 0.92; // Mock conversion
    
    res.json({
      originalAmount: amount,
      originalCurrency: fromCurrency,
      convertedAmount,
      convertedCurrency: toCurrency,
      rate: 0.92
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrencyRate = async (req, res) => {
  try {
    const { currency } = req.params;
    res.json({
      currency,
      rate: 0.92,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExchangeRates,
  getSupportedCurrencies,
  convertCurrency,
  getCurrencyRate
};
const asyncHandler = require('../utils/asyncHandler');

const getExchangeRates = asyncHandler(async (req, res) => {
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
});

const getSupportedCurrencies = asyncHandler(async (req, res) => {
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
});

const convertCurrency = asyncHandler(async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;
  const convertedAmount = amount * 0.92; // Mock conversion

  res.json({
    originalAmount: amount,
    originalCurrency: fromCurrency,
    convertedAmount,
    convertedCurrency: toCurrency,
    rate: 0.92
  });
});

const getCurrencyRate = asyncHandler(async (req, res) => {
  const { currency } = req.params;
  res.json({
    currency,
    rate: 0.92,
    timestamp: new Date()
  });
});

module.exports = {
  getExchangeRates,
  getSupportedCurrencies,
  convertCurrency,
  getCurrencyRate
};

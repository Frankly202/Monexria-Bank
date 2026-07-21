// Exchange rates expressed as units of the currency per 1 USD.
// Covers major currencies across all continents so conversions are supported
// "for all countries" a customer is likely to transact in.
const RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.36,
  AUD: 1.52,
  INR: 83.1,
  CNY: 7.24,
  CHF: 0.88,
  HKD: 7.82,
  SGD: 1.34,
  NZD: 1.64,
  SEK: 10.6,
  NOK: 10.7,
  DKK: 6.87,
  ZAR: 18.7,
  BRL: 4.97,
  MXN: 17.1,
  AED: 3.67,
  SAR: 3.75,
  NGN: 1550.0,
  KES: 129.0,
  GHS: 15.3,
  EGP: 48.5,
  TRY: 32.8,
  RUB: 92.5,
  KRW: 1330.0,
  IDR: 15800.0,
  MYR: 4.68,
  THB: 35.8,
  PHP: 56.4,
  PKR: 278.0,
  BDT: 118.0,
  PLN: 3.98,
  CZK: 23.1,
  HUF: 360.0,
  ILS: 3.72,
  QAR: 3.64,
  KWD: 0.31,
  ARS: 890.0
};

const CURRENCY_META = {
  USD: { name: 'US Dollar', symbol: '$', country: 'United States' },
  EUR: { name: 'Euro', symbol: '€', country: 'Eurozone' },
  GBP: { name: 'British Pound', symbol: '£', country: 'United Kingdom' },
  JPY: { name: 'Japanese Yen', symbol: '¥', country: 'Japan' },
  CAD: { name: 'Canadian Dollar', symbol: 'C$', country: 'Canada' },
  AUD: { name: 'Australian Dollar', symbol: 'A$', country: 'Australia' },
  INR: { name: 'Indian Rupee', symbol: '₹', country: 'India' },
  CNY: { name: 'Chinese Yuan', symbol: '¥', country: 'China' },
  CHF: { name: 'Swiss Franc', symbol: 'CHF', country: 'Switzerland' },
  HKD: { name: 'Hong Kong Dollar', symbol: 'HK$', country: 'Hong Kong' },
  SGD: { name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore' },
  NZD: { name: 'New Zealand Dollar', symbol: 'NZ$', country: 'New Zealand' },
  SEK: { name: 'Swedish Krona', symbol: 'kr', country: 'Sweden' },
  NOK: { name: 'Norwegian Krone', symbol: 'kr', country: 'Norway' },
  DKK: { name: 'Danish Krone', symbol: 'kr', country: 'Denmark' },
  ZAR: { name: 'South African Rand', symbol: 'R', country: 'South Africa' },
  BRL: { name: 'Brazilian Real', symbol: 'R$', country: 'Brazil' },
  MXN: { name: 'Mexican Peso', symbol: 'Mex$', country: 'Mexico' },
  AED: { name: 'UAE Dirham', symbol: 'د.إ', country: 'United Arab Emirates' },
  SAR: { name: 'Saudi Riyal', symbol: '﷼', country: 'Saudi Arabia' },
  NGN: { name: 'Nigerian Naira', symbol: '₦', country: 'Nigeria' },
  KES: { name: 'Kenyan Shilling', symbol: 'KSh', country: 'Kenya' },
  GHS: { name: 'Ghanaian Cedi', symbol: 'GH₵', country: 'Ghana' },
  EGP: { name: 'Egyptian Pound', symbol: 'E£', country: 'Egypt' },
  TRY: { name: 'Turkish Lira', symbol: '₺', country: 'Turkey' },
  RUB: { name: 'Russian Ruble', symbol: '₽', country: 'Russia' },
  KRW: { name: 'South Korean Won', symbol: '₩', country: 'South Korea' },
  IDR: { name: 'Indonesian Rupiah', symbol: 'Rp', country: 'Indonesia' },
  MYR: { name: 'Malaysian Ringgit', symbol: 'RM', country: 'Malaysia' },
  THB: { name: 'Thai Baht', symbol: '฿', country: 'Thailand' },
  PHP: { name: 'Philippine Peso', symbol: '₱', country: 'Philippines' },
  PKR: { name: 'Pakistani Rupee', symbol: '₨', country: 'Pakistan' },
  BDT: { name: 'Bangladeshi Taka', symbol: '৳', country: 'Bangladesh' },
  PLN: { name: 'Polish Zloty', symbol: 'zł', country: 'Poland' },
  CZK: { name: 'Czech Koruna', symbol: 'Kč', country: 'Czechia' },
  HUF: { name: 'Hungarian Forint', symbol: 'Ft', country: 'Hungary' },
  ILS: { name: 'Israeli Shekel', symbol: '₪', country: 'Israel' },
  QAR: { name: 'Qatari Riyal', symbol: '﷼', country: 'Qatar' },
  KWD: { name: 'Kuwaiti Dinar', symbol: 'د.ك', country: 'Kuwait' },
  ARS: { name: 'Argentine Peso', symbol: '$', country: 'Argentina' }
};

// Returns the exchange rate between two supported currencies, or null if
// either currency is not supported.
const getRate = (from, to) => {
  const fromRate = RATES[from];
  const toRate = RATES[to];
  if (fromRate === undefined || toRate === undefined) {
    return null;
  }
  // Convert `from` -> USD -> `to`.
  return toRate / fromRate;
};

const getExchangeRates = async (req, res) => {
  try {
    res.json({ base: 'USD', rates: RATES, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSupportedCurrencies = async (req, res) => {
  try {
    const currencies = Object.keys(CURRENCY_META).map((code) => ({
      code,
      ...CURRENCY_META[code]
    }));
    res.json({ currencies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const convertCurrency = async (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: 'A positive amount is required' });
    }
    if (!fromCurrency || !toCurrency) {
      return res.status(400).json({ error: 'fromCurrency and toCurrency are required' });
    }

    const from = String(fromCurrency).toUpperCase();
    const to = String(toCurrency).toUpperCase();
    const rate = getRate(from, to);
    if (rate === null) {
      return res.status(400).json({ error: `Unsupported currency: ${RATES[from] === undefined ? from : to}` });
    }

    const convertedAmount = Number((numericAmount * rate).toFixed(2));

    res.json({
      originalAmount: numericAmount,
      originalCurrency: from,
      convertedAmount,
      convertedCurrency: to,
      rate: Number(rate.toFixed(6)),
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrencyRate = async (req, res) => {
  try {
    const currency = String(req.params.currency || '').toUpperCase();
    const rate = RATES[currency];
    if (rate === undefined) {
      return res.status(404).json({ error: `Unsupported currency: ${currency}` });
    }
    res.json({ currency, rate, base: 'USD', timestamp: new Date() });
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

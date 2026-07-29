const currencyController = require('../../src/controllers/currencyController');
const { mockReq, mockRes } = require('../helpers');

describe('getExchangeRates', () => {
  test('returns a rate map anchored to USD with a timestamp', async () => {
    const res = mockRes();
    await currencyController.getExchangeRates(mockReq(), res);

    expect(res.body.rates.USD).toBe(1.0);
    expect(res.body.rates.EUR).toBe(0.92);
    expect(Object.keys(res.body.rates)).toHaveLength(7);
    expect(res.body.timestamp).toBeInstanceOf(Date);
  });
});

describe('getSupportedCurrencies', () => {
  test('lists supported currencies with code, name and symbol', async () => {
    const res = mockRes();
    await currencyController.getSupportedCurrencies(mockReq(), res);

    expect(res.body.currencies).toHaveLength(7);
    const usd = res.body.currencies.find((c) => c.code === 'USD');
    expect(usd).toEqual({ code: 'USD', name: 'US Dollar', symbol: '$' });
    res.body.currencies.forEach((c) => {
      expect(c).toHaveProperty('code');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('symbol');
    });
  });
});

describe('convertCurrency', () => {
  test('applies the mock 0.92 rate to the amount', async () => {
    const req = mockReq({ body: { amount: 100, fromCurrency: 'USD', toCurrency: 'EUR' } });
    const res = mockRes();

    await currencyController.convertCurrency(req, res);

    expect(res.body).toEqual({
      originalAmount: 100,
      originalCurrency: 'USD',
      convertedAmount: 92,
      convertedCurrency: 'EUR',
      rate: 0.92,
    });
  });
});

describe('getCurrencyRate', () => {
  test('echoes the requested currency param with a rate', async () => {
    const req = mockReq({ params: { currency: 'GBP' } });
    const res = mockRes();

    await currencyController.getCurrencyRate(req, res);

    expect(res.body.currency).toBe('GBP');
    expect(res.body.rate).toBe(0.92);
    expect(res.body.timestamp).toBeInstanceOf(Date);
  });
});

const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');
const { auth } = require('../middleware/auth');

// Currency endpoints
router.get('/rates', currencyController.getExchangeRates);
router.get('/supported', currencyController.getSupportedCurrencies);
router.post('/convert', auth, currencyController.convertCurrency);
router.get('/rates/:currency', currencyController.getCurrencyRate);

module.exports = router;
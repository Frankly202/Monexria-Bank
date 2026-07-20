const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { auth } = require('../middleware/auth');

// Transaction endpoints
router.get('/', auth, transactionController.getTransactions);
router.post('/deposit', auth, transactionController.deposit);
router.post('/withdraw', auth, transactionController.withdraw);
router.post('/transfer', auth, transactionController.transfer);
router.get('/:transactionId', auth, transactionController.getTransaction);
router.get('/history/:accountId', auth, transactionController.getTransactionHistory);
router.post('/:transactionId/cancel', auth, transactionController.cancelTransaction);
router.get('/analytics/monthly', auth, transactionController.getMonthlyAnalytics);

module.exports = router;
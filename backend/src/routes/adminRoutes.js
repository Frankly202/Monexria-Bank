const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth, admin } = require('../middleware/auth');

// Admin routes (protected)
router.get('/dashboard', auth, admin, adminController.getDashboard);
router.get('/users', auth, admin, adminController.getAllUsers);
router.get('/users/:userId', auth, admin, adminController.getUserDetails);
router.post('/users/:userId/suspend', auth, admin, adminController.suspendUser);
router.post('/users/:userId/activate', auth, admin, adminController.activateUser);
router.get('/transactions', auth, admin, adminController.getAllTransactions);
router.get('/reports/daily', auth, admin, adminController.getDailyReport);
router.get('/reports/monthly', auth, admin, adminController.getMonthlyReport);
router.post('/settings', auth, admin, adminController.updateSettings);

module.exports = router;
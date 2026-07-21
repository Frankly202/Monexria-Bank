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

// Customer-service support (AI assistant + live care metrics). Gated by auth
// only — the assistant is meant to help any logged-in customer, and the mock
// backend does not issue admin roles.
router.post('/support/chat', auth, adminController.supportChat);
router.get('/support/stats', auth, adminController.getSupportStats);
router.get('/support/tickets', auth, adminController.getSupportTickets);

module.exports = router;
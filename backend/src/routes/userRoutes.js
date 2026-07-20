const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.get('/settings', auth, userController.getSettings);
router.put('/settings', auth, userController.updateSettings);
router.post('/change-password', auth, userController.changePassword);
router.post('/enable-2fa', auth, userController.enable2FA);
router.post('/disable-2fa', auth, userController.disable2FA);
router.get('/notifications', auth, userController.getNotifications);

module.exports = router;
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { auth } = require('../middleware/auth');

// Account endpoints
router.get('/', auth, accountController.getAccounts);
router.post('/', auth, accountController.createAccount);
router.get('/:accountId', auth, accountController.getAccountDetails);
router.get('/:accountId/balance', auth, accountController.getBalance);
router.put('/:accountId', auth, accountController.updateAccount);
router.delete('/:accountId', auth, accountController.closeAccount);
router.get('/:accountId/statement', auth, accountController.getStatement);

module.exports = router;
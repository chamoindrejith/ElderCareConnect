const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationReminders.controllers.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');


router.post('/addmed', authenticateToken, medicationController.createReminder);
router.get('/viewmed', authenticateToken, medicationController.getReminders);
router.put('/:id/updatemed', authenticateToken, medicationController.updateReminder);
router.delete('/:id/deletemed', authenticateToken, medicationController.deleteReminder);

module.exports = router;


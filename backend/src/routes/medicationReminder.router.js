const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationReminder.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');


router.post('/addmed', authenticateToken, medicationController.createReminder);
router.get('/viewmed', authenticateToken, medicationController.getReminders);

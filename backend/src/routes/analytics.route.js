const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const analyticsController = require('../controllers/analytics.controller');

// Get analytics summary for a user
router.get('/summary', authenticateToken, analyticsController.getUserAnalytics);

module.exports = router

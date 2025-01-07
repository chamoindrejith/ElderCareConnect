const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');

// Route to fetch health summary for a user
router.get('/summary/:userId', analyticsController.getHealthSummary);

module.exports = router;

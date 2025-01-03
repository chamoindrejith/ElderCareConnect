const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const healthDataController = require('../controllers/healthData.controller');

// Add health data
router.post('/', authenticateToken, healthDataController.addHealthData);

// Get health data
router.get('/', authenticateToken, healthDataController.getHealthData);

module.exports = router;

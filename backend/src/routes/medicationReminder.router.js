const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationReminder.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');


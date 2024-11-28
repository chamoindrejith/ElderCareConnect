const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chat.controllers');

const { authenticateToken } = require('../middleware/auth.middleware');


router.get('/history/:senderId/:receiverId', authenticateToken, chatController.getChatHistory);

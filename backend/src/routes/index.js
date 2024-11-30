const express = require('express');

const medicationRemindersRouter = require('./medicationReminder.router.js');
const emergencyContact=require('./emergencyContact.route.js');

const chatRouter = require('../routes/chat.router.js')

const router = express.Router();

router.use('/medicationReminders', medicationRemindersRouter);
router.use('/chat', chatRouter);
router.use('/emContacts',emergencyContact)

module.exports = router;
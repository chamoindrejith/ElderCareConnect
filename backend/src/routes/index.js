const express = require('express');

const medicationRemindersRouter = require('./medicationReminder.router.js');

const router = express.Router();

router.use('/medicationReminders', medicationRemindersRouter);

module.exports = router;
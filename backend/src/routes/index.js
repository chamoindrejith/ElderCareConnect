const express = require('express');

const medicationRemindersRouter = require('./medicationReminder.router.js');

const chatRouter = require('../routes/chat.router.js');

const userRouter = require('../routes/userRouter.js');

const router = express.Router();

router.use('/medicationReminders', medicationRemindersRouter);
router.use('/chat', chatRouter);
router.use('/user',userRouter);


module.exports = router;
const express = require('express');

const medicationRemindersRouter = require('./medicationReminder.router.js');
const emergencyContact=require('./emergencyContact.route.js');

const chatRouter = require('../routes/chat.router.js');

const userRouter = require('../routes/userRouter.js');

const locationTrackingRouter = require('../routes/locationTrackingRouter.js');

const router = express.Router();

const healthDataRoutes = require('./routes/healthData.routes');
router.use('/api/health-data', healthDataRoutes);

router.use('/medicationReminders', medicationRemindersRouter);
router.use('/chat', chatRouter);

router.use('/user',userRouter);


router.use('/emContacts',emergencyContact);

router.use('/locationTracking',locationTrackingRouter);

module.exports = router;

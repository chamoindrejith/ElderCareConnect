const express = require('express');

const medicationRemindersRouter = require('./medicationReminder.router.js');
const emergencyContact=require('./emergencyContact.route.js');

const chatRouter = require('./chat.router.js');

const userRouter = require('./userRouter.js');

const locationTrackingRouter = require('./locationTrackingRouter.js');

const router = express.Router();

const healthDataRoutes = require('./healthData.routes');
router.use('/api/health-data', healthDataRoutes);

router.use('/medicationReminders', medicationRemindersRouter);
router.use('/chat', chatRouter);

router.use('/user',userRouter);


router.use('/emContacts',emergencyContact);

router.use('/locationTracking',locationTrackingRouter);

module.exports = router;

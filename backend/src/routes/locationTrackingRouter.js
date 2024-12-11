const express = require('express');
const router = express.Router();
const locationTrackingController = require('../controllers/locationTrackingController');

// Add a new location
router.post('/', locationTrackingController.addLocation);

// Get all locations for a user
router.get('/user/:userId', locationTrackingController.getUserLocations);



module.exports = router;

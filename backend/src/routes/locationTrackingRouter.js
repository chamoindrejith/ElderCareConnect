const express = require('express');
const router = express.Router();
const locationTrackingController = require('../controllers/locationTrackingController');

// Add or update a user's live location
router.post('/update', locationTrackingController.updateLiveLocation);

// Get live location of a user
router.get('/user/:userId', locationTrackingController.getLiveLocation);

module.exports = router;









/* const express = require('express');
const router = express.Router();
const locationTrackingController = require('../controllers/locationTrackingController');

// Add a new location
router.post('/', locationTrackingController.addLocation);

// Get all locations for a user
router.get('/user/:userId', locationTrackingController.getUserLocations);


// Get nearby locations
router.get('/nearby', locationTrackingController.getNearbyLocations);

module.exports = router;
 */
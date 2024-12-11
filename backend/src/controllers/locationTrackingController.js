const LocationTracking = require('../models/LocationTracking');

// Add a new location
exports.addLocation = async (req, res) => {
  try {
    const { userId, longitude, latitude, emergencyStatus } = req.body;

    const newLocation = new LocationTracking({
      userId,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      emergencyStatus,
    });

    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all locations for a user
exports.getUserLocations = async (req, res) => {
  try {
    const { userId } = req.params;

    const locations = await LocationTracking.find({ userId }).sort({ timestamp: -1 });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get nearby locations
exports.getNearbyLocations = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance } = req.query;

    const locations = await LocationTracking.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance, 10),
        },
      },
    });

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







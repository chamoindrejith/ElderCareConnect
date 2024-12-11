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

const LocationTracking = require('../models/LocationTracking');

// Add or update a user's live location
exports.updateLiveLocation = async (req, res) => {
  try {
    const { userId, longitude, latitude } = req.body;

    // Update location if it exists, otherwise create a new one
    const location = await LocationTracking.findOneAndUpdate(
      { userId },
      {
        userId,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get live location of a user
exports.getLiveLocation = async (req, res) => {
  try {
    const { userId } = req.params;

    const location = await LocationTracking.findOne({ userId });

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Include Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps?q=${location.location.coordinates[1]},${location.location.coordinates[0]}`;

    res.status(200).json({
      location,
      mapUrl: googleMapsUrl,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};











/* const LocationTracking = require('../models/LocationTracking');

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






 */
const HealthData = require('../models/healthData.model');

// Add new health data
exports.addHealthData = async (req, res) => {
  try {
    const { heartRate, bloodPressure, temperature } = req.body;
    const userId = req.user._id; // Assuming `req.user` contains authenticated user's info

    // Validate input
    if (!heartRate || !bloodPressure || !temperature) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new health data entry
    const healthData = new HealthData({ userId, heartRate, bloodPressure, temperature });
    await healthData.save();

    res.status(201).json({
      success: true,
      message: 'Health data added successfully.',
      data: healthData,
    });
  } catch (error) {
    console.error('Error adding health data:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

// Get health data for a user
exports.getHealthData = async (req, res) => {
  try {
    const userId = req.user._id;

    const healthData = await HealthData.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Health data retrieved successfully.',
      data: healthData,
    });
  } catch (error) {
    console.error('Error fetching health data:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

const HealthData = require('../models/healthData.model');

// Add new health data with abnormality detection
const addHealthData = async (req, res) => {
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

    // Detect abnormalities
    const abnormalities = [];
    if (heartRate < 60 || heartRate > 100) {
      abnormalities.push('Abnormal heart rate detected.');
    }
    const [systolic, diastolic] = bloodPressure.split('/').map(Number);
    if (systolic > 140 || systolic < 90 || diastolic > 90 || diastolic < 60) {
      abnormalities.push('Abnormal blood pressure detected.');
    }
    if (temperature > 100.4 || temperature < 95) {
      abnormalities.push('Abnormal body temperature detected.');
    }

    // Respond to the client
    res.status(201).json({
      success: true,
      message: abnormalities.length
        ? `Health data added successfully. Abnormalities detected: ${abnormalities.join(', ')}`
        : 'Health data added successfully. No abnormalities detected.',
      data: healthData,
      abnormalities,
    });
  } catch (error) {
    console.error('Error adding health data:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

module.exports = {addHealthData}
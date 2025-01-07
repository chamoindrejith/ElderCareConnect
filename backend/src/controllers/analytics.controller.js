const HealthData = require('../models/healthData.model');

// Get analytics summary for a user
exports.getUserAnalytics = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `req.user` contains authenticated user's info

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Aggregate analytics (e.g., average heart rate, total steps, etc.)
    const analytics = await HealthData.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null, // Group all data for this user
          averageHeartRate: { $avg: '$heartRate' },
          highestTemperature: { $max: '$temperature' },
          latestBloodPressure: { $last: '$bloodPressure' },
          entryCount: { $sum: 1 }, // Number of records
        },
      },
    ]);

    // Check if there is data
    if (!analytics || analytics.length === 0) {
      return res.status(404).json({ message: 'No health data found for this user.' });
    }

    res.status(200).json({
      success: true,
      message: 'User analytics retrieved successfully.',
      data: analytics[0],
    });
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

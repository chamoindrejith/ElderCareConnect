const HealthData = require('../models/healthData.model');

// Get Average Health Stats
exports.getHealthSummary = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Aggregate data for analytics
    const analytics = await HealthData.aggregate([
      { $match: { userId } }, // Filter by user
      {
        $group: {
          _id: null,
          avgHeartRate: { $avg: '$heartRate' },
          totalSteps: { $sum: '$steps' },
          totalCalories: { $sum: '$caloriesBurned' },
        },
      },
    ]);

    if (!analytics.length) {
      return res.status(404).json({ message: 'No data found for this user.' });
    }

    res.status(200).json({
      message: 'Health data summary retrieved successfully.',
      data: analytics[0],
    });
  } catch (error) {
    console.error('Error fetching health summary:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const mongoose = require('mongoose');

// Enhance the LocationTracking schema to include geospatial data
const locationTrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  emergencyStatus: { type: Boolean, default: false },
});

// Create a 2dsphere index for the location field
locationTrackingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('LocationTracking', locationTrackingSchema);

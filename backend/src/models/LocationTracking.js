const mongoose =require('mongoose');

const locationTrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  latitude: { type: Number },
  longitude: { type: Number },
  emergencyStatus: { type: Boolean, default: false }
});

module.exports = mongoose.model('LocationTracking', locationTrackingSchema);


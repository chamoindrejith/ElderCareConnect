const mongoose =require('mongoose');

const wellnessCheckinSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  responseStatus: { type: String, enum: ['completed', 'incomplete'], default: 'incomplete' }
});

module.exports = mongoose.model('WellnessCheckin', wellnessCheckinSchema);


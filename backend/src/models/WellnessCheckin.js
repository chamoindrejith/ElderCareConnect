import mongoose from 'mongoose';

const wellnessCheckinSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  responseStatus: { type: String, enum: ['completed', 'incomplete'], default: 'incomplete' }
});

const WellnessCheckin = mongoose.model('WellnessCheckin', wellnessCheckinSchema);
export default WellnessCheckin;

import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  heartRate: { type: Number },
  bloodPressure: { type: String },
  activityLevel: { type: String },
  sleepPattern: { type: String },
  vitalSign: { type: String },
  medicationReminder: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);
export default HealthRecord;

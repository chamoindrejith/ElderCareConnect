const mongoose =require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  healthRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthRecord', required: true },
  alertType: { type: String },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'resolved'], default: 'active' }
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;

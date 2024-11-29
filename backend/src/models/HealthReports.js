import mongoose from 'mongoose';

const healthReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportDate: { type: Date, default: Date.now },
  vitalStatsSummary: { type: String },
  activitySummary: { type: String },
  medicationAdherence: { type: String }
});

const HealthReport = mongoose.model('HealthReport', healthReportSchema);
export default HealthReport;

const mongoose =require('mongoose');

const healthReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportDate: { type: Date, default: Date.now },
  vitalStatsSummary: { type: String },
  activitySummary: { type: String },
  medicationAdherence: { type: String }
});

module.exports = mongoose.model('HealthReport', healthReportSchema);


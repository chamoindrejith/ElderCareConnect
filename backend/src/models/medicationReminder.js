const mongoose =require('mongoose');

const medicationReminderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('MedicationReminder', medicationReminderSchema);

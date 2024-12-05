const mongoose = require('mongoose');

const medicationReminderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    reminderTime: { type: String, required: true, match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, use HH:mm (24-hour format)'] },
    createdBy: { type: String, required: true },
    updatedBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('MedicationReminder', medicationReminderSchema);

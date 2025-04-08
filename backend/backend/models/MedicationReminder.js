const mongoose =require('mongoose');

const medicationReminderSchema = new mongoose.Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    reminderName: { type: String, required: true },
    reminderDateTime: { type: Date, required: true},
    reminderDescription: { type: String, required: true },
  });

module.exports = mongoose.model('MedicationReminder', medicationReminderSchema);


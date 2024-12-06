const mongoose = require('mongoose')


const emergencyContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  relationship: { type: String },
  contactNumber: { type: String },
  email: { type: String }
});


module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);


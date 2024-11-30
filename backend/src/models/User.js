const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date },
  contactInfo: { type: String },
  address: { type: String },
  emergencyContactId: { type: mongoose.Schema.Types.ObjectId, ref: 'EmergencyContact' },
  medicalInfoId: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthRecord' },
  role: { type: String, enum: ['eldery', 'caregiver'], required:true},
  lastCheckin: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

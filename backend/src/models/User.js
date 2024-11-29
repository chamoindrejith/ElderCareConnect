import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date },
  contactInfo: { type: String },
  address: { type: String },
  emergencyContactId: { type: mongoose.Schema.Types.ObjectId, ref: 'EmergencyContact' },
  medicalInfoId: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthRecord' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  lastCheckin: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;

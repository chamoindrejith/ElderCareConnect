import mongoose from 'mongoose';

const userSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notificationPreference: { type: Boolean, default: true },
  privacySettings: { type: String, default: 'public' },
  accessibilitySettings: { type: String },
  fontSize: { type: String, default: 'medium' },
  languagePreference: { type: String, default: 'English' }
});

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);
export default UserSettings;

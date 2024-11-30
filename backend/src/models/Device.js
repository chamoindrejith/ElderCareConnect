const mongoose =require('mongoose');

const deviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deviceType: { type: String },
  status: { type: String, default: 'active' },
  lastSyncTime: { type: Date, default: Date.now }
});

const Device = mongoose.model('Device', deviceSchema);
export default Device;

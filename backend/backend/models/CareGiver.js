const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CareGiverSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  nic: { type: String, unique: true, required: true },
  age: { type: Number },
  address: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  gender:{  type: String },
  relationships: [{ type: String }], 
});

CareGiverSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('CareGiver', CareGiverSchema);






const CareGiver = require('../models/CareGiver');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key

async function registerCareGiver(data) {
  const { username, password, email } = data;

  // Check if username or email already exists
  const existingUser = await CareGiver.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('Username or email already exists');
  }

  const careGiver = new CareGiver(data);
  await careGiver.save();
  return careGiver;
}

async function loginCareGiver(username, password) {
  const careGiver = await CareGiver.findOne({ username });
  if (!careGiver) {
    throw new Error('Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, careGiver.password);
  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ id: careGiver._id, role: 'caregiver' }, JWT_SECRET, { expiresIn: '1h' });
  return { token, careGiver };
}

module.exports = {
  registerCareGiver,
  loginCareGiver,
};

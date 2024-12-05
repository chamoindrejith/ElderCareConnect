const Location = require('../models/locationShare.js');
const newLocation = new Location({ sender: senderId, receiver: receiverId, location });
await newLocation.save();

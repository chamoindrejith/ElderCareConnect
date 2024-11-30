const EmergencyContact = require('../models/emergencyContact.js');

exports.createContact = async (req, res) => {
  try {
    const { name, contactNumber, email, userId } = req.body;

    // Validate required fields
    if (!name || !contactNumber || !email || !userId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new emergency contact
    const contact = new EmergencyContact({
      name,
      contactNumber,
      email,
      userId,
    });

    // Save the contact to the database
    await contact.save();

    // Respond with the created contact
    res.status(201).json({ message: 'Contact created successfully', contact });
  } catch (error) {
    console.error('Error creating contact:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

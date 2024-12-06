const EmergencyContact=require('../models/emergencyContact');

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


exports.getContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error });
  }
};


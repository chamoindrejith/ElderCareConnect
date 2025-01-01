const EmergencyContact=require('../models/emergencyContact');

exports.getEmergencyContacts = async (req, res) => {
  try {
    // Fetch all emergency contacts
    const contacts = await EmergencyContact.find();

    // Respond with the retrieved contacts
    res.status(200).json({
      success: true,
      message: 'Emergency contacts retrieved successfully',
      data: contacts
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching emergency contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emergency contacts',
      error: error.message
    });
  }
};

// Endpoint to fetch emergency contacts and trigger an emergency call
exports.getEmergencyContactsAndMakeCall = async (req, res) => {
  try {
    // Fetch emergency contacts for the user
    const contacts = await EmergencyContact.find({ userId: req.user._id });

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No emergency contacts found." });
    }

    // Example: Use the first contact for the call (can be extended for user choice)
    const toNumber = contacts[0].contactNumber; // Updated to match `contactNumber` field in the schema

    if (!toNumber) {
      return res.status(400).json({ message: "Contact number is missing for the selected emergency contact." });
    }

    // Trigger a call using Twilio
    client.calls
      .create({
        url: "http://demo.twilio.com/docs/voice.xml", // Replace with your XML file URL
        to: toNumber,
        from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
      })
      .then((call) => {
        console.log("Call initiated:", call.sid);
        res.status(200).json({
          message: "Call initiated successfully.",
          contact: {
            name: contacts[0].name,
            relationship: contacts[0].relationship,
            contactNumber: contacts[0].contactNumber,
            email: contacts[0].email,
          }, // Return the contacted person details
        });
      })
      .catch((error) => {
        console.error("Error making call:", error);
        res.status(500).json({ message: "Failed to initiate call.", error });
      });
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
    res.status(500).json({
      message: "Error fetching emergency contacts",
      error,
    });
  }
};

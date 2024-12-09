const { getMessaging } = require('firebase-admin/messaging');

// Controller function to send notification
const sendNotification = async (req, res) => {
  // Extract the FCM token from the request body
  const { fcmToken } = req.body || {};

  // Check if fcmToken is provided in the body
  if (!fcmToken) {
    return res.status(400).json({
      success: false,
      error: 'FCM token is required to send the notification.',
    });
  }

  // Message object that will be sent to FCM
  const message = {
    notification: {
      title: 'Fall Detected',
      body: 'A fall was detected. Please check the user.',
    },
    token: fcmToken, // FCM token provided in the request
  };

  // Send the notification using Firebase Messaging
  try {
    const response = await getMessaging().send(message);
    res.status(200).json({
      success: true,
      message: 'Notification sent successfully.',
      response,
    });
    console.log('Notification sent:', response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to send notification.',
      details: error.message,
    });
    console.error('Error sending notification:', error);
  }
};

module.exports = {
  sendNotification,
};

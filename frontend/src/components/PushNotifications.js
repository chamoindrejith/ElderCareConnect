import React, { useEffect } from 'react';

const PushNotifications = () => {
  const subscribeToNotifications = async () => {
    try {
      // Request permission for notifications
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        console.log('Notification permission granted.');

        // Assuming `messaging` is initialized in Firebase
        const { getToken } = require('firebase/messaging');
        const { messaging } = require('../firebase/firebase-config');

        const fcmToken = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
        });

        if (fcmToken) {
          console.log('FCM Token:', fcmToken);

          // Send the FCM token to the backend
          await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications/subscribe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fcmToken }),
          });

          console.log('Token sent to backend successfully.');
        } else {
          console.error('Failed to generate FCM token.');
        }
      } else {
        console.warn('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
    }
  };

  useEffect(() => {
    subscribeToNotifications();
  }, []);

  return (
 <> 
 
 </>
  );
};

export default PushNotifications;


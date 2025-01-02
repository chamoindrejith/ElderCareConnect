import React from 'react';
import './PushNotifications.css';

function PushNotifications() {
  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <div className="notification">
        <p>Medication Reminder: Take your pills at 6 PM.</p>
      </div>
      <div className="notification">
        <p>Emergency Alert: Your caregiver called for help.</p>
      </div>
    </div>
  );
}

export default PushNotifications;

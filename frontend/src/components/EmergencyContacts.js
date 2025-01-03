import React from 'react';
import './EmergencyContacts.css';

function EmergencyContacts() {
  return (
    <div className="emergency-contacts">
  <div className="contact">
    <p>Emergency Services</p>
    <button className="phone-button">
      <i className="fas fa-phone-alt"></i> {/* Phone icon */}
    </button>
  </div>
  <div className="contact">
    <p>Family Member</p>
    <button className="phone-button">
      <i className="fas fa-phone-alt"></i> {/* Phone icon */}
    </button>
  </div>
</div>

  );
}

export default EmergencyContacts;

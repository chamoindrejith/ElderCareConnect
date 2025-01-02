import React from 'react';
import './UserProfile.css';

function UserProfile() {
  return (
    <div className="user-profile">
  <div className="user-photo">
    <img src="path-to-your-image.jpg" alt="User Photo" />
  </div>
  <div className="user-name">
    Jane Doe
  </div>
  <div className="user-details">
    <p>Age: 30</p>
    <p>Location: New York</p>
  </div>
</div>

  );
}

export default UserProfile;

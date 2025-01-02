import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [emergencyStatus, setEmergencyStatus] = useState(false);
  const [locations, setLocations] = useState([]);
  const [maxDistance, setMaxDistance] = useState('');
  const [nearbyLocations, setNearbyLocations] = useState([]);

  const addLocation = async () => {
    try {
      const response = await axios.post('/api/location-tracking', {
        userId,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        emergencyStatus,
      });
      alert('Location added successfully!');
    } catch (error) {
      alert('Error adding location: ' + error.message);
    }
  };

  const fetchUserLocations = async () => {
    try {
      const response = await axios.get(`/api/location-tracking/user/${userId}`);
      setLocations(response.data);
    } catch (error) {
      alert('Error fetching user locations: ' + error.message);
    }
  };

  const fetchNearbyLocations = async () => {
    try {
      const response = await axios.get('/api/location-tracking/nearby', {
        params: {
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude),
          maxDistance: parseInt(maxDistance, 10),
        },
      });
      setNearbyLocations(response.data);
    } catch (error) {
      alert('Error fetching nearby locations: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Location Tracking</h1>

      <div>
        <h2>Add Location</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <label>
          Emergency Status:
          <input
            type="checkbox"
            checked={emergencyStatus}
            onChange={(e) => setEmergencyStatus(e.target.checked)}
          />
        </label>
        <button onClick={addLocation}>Add Location</button>
      </div>

      <div>
        <h2>Fetch User Locations</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchUserLocations}>Fetch Locations</button>
        <ul>
          {locations.map((loc) => (
            <li key={loc._id}>
              {loc.location.coordinates.join(', ')} - {new Date(loc.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Find Nearby Locations</h2>
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Max Distance (meters)"
          value={maxDistance}
          onChange={(e) => setMaxDistance(e.target.value)}
        />
        <button onClick={fetchNearbyLocations}>Find Nearby Locations</button>
        <ul>
          {nearbyLocations.map((loc) => (
            <li key={loc._id}>
              {loc.location.coordinates.join(', ')} - {new Date(loc.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

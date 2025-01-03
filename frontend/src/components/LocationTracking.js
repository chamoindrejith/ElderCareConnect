import { useState } from 'react';
import axios from 'axios';
import './Locationtracking.css';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const updateLocation = async () => {
    try {
      // Use geolocation API to get current position
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Hardcoded User ID, or you can get it from another source
        const userId = 'user123'; // Replace with dynamic userId if needed
        
        // Send the location data to your API
        const response = await axios.post('http://localhost:5000/api/update', { userId, longitude, latitude });
        setLocation(response.data);
        setError(null);
      }, (err) => {
        setError('Failed to get location: ' + err.message);
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating location');
    }
  };

  const getLocation = async () => {
    try {
      // Hardcoded User ID, or you can get it from another source
      const userId = 'user123'; // Replace with dynamic userId if needed

      const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      setLocation(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching location');
    }
  };

  return (
    <div className="container">
      <h1>Live Location Tracker</h1>
      
      <button onClick={updateLocation} className="button">Get My Location</button>
      <button onClick={getLocation} className="button">View Location</button>

      {error && <p className="error">{error}</p>}

      {location && (
        <div className="location">
          <p><strong>User ID:</strong> {location.location.userId}</p>
          <p><strong>Coordinates:</strong> {location.location.location.coordinates.join(', ')}</p>
          <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="link">View on Google Maps</a>
        </div>
      )}
    </div>
  );
};

export default Home;

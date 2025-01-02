import React, { useState } from 'react';
import './FeelingCheckIn.css';

function FeelingCheckIn() {
  const [feeling, setFeeling] = useState('');

  return (
    <div className="feeling-checkin">
      <h2>Feeling Check-in</h2>
      <form>
        <label>
          How are you feeling today?
          <select value={feeling} onChange={(e) => setFeeling(e.target.value)}>
            <option value="">Select</option>
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="sad">Sad</option>
          </select>
        </label>
        <textarea placeholder="Additional comments"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeelingCheckIn;

import React from 'react';
import './HealthDashboard.css';

function HealthDashboard() {
  return (
    <div className="health-dashboard">
      <h2>Health Metrics</h2>
      <div className="metrics">
        <div className="metric-card">
          <h3>Heart Rate</h3>
          <p>85 bpm</p>
        </div>
        <div className="metric-card">
          <h3>Blood Pressure</h3>
          <p>120/80 mmHg</p>
        </div>
        <div className="metric-card">
          <h3>Steps Taken</h3>
          <p>2500 steps</p>
        </div>
      </div>
      <div className="graph">
        <h3>Weekly Activity</h3>
        <div className="graph-placeholder">[Graph Placeholder]</div>
      </div>
    </div>
  );
}

export default HealthDashboard;

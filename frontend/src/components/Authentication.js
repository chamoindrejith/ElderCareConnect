import React from 'react';
import './Authentication.css';

function Authentication() {
  return (
    <div className="auth-container">
      <h1>Welcome to ElderCare Connect</h1>
      <form className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="#register">Register</a></p>
      </form>
    </div>
  );
}

export default Authentication;

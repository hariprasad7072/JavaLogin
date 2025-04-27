import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Login successful!');
      } else {
        setMessage('Login failed: ' + data.message);
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="decoration-dots top-left"></div>
        <div className="decoration-dots top-right"></div>
        <div className="decoration-dots bottom-left"></div>
        <div className="decoration-dots bottom-right"></div>
        
        <div className="login-header">
          <div className="login-icon">
            <i className="icon-user"></i>
          </div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Please sign in to continue</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password:</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        
        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;
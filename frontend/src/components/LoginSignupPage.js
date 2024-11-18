import React, { useState } from 'react';
import { login, signup } from '../api/authApi';
import './LoginSignupPage.css';
import Navbar from './Navbar';

const LoginSignupPage = ({ onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isFloating, setIsFloating] = useState(false);

  const handleToggle = () => {
    setIsSignup((prev) => !prev);
    setMessage('');
  };

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        const response = await signup(username, password);
        setMessage(response);
        setIsSignup(false);
      } else {
        const response = await login(username, password);
        setMessage(response);
        setIsFloating(true);

        setTimeout(() => {
          onLoginSuccess();
        }, 500); // Match animation duration
      }
    } catch (err) {
      setMessage(err);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="login-signup-page">
      <div className="sparkles">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            className="sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>
      <div className={`form-container ${isFloating ? 'floating' : ''}`}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <button className="toggle-btn" onClick={handleToggle}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
    </>
  );
};

export default LoginSignupPage;

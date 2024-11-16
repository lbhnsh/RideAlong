import React, { useEffect, useState } from 'react';
import { getServices } from '../api/serviceApi';
import './HomePage.css';

const HomePage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  const handleLogin = () => {
    alert('Login button clicked!');
  };

  const handleSignUp = () => {
    alert('Sign Up button clicked!');
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">Welcome to Multi-Modal Transport</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Starting Point" />
        <input type="text" placeholder="Destination" />
        <input type="datetime-local" />
        <button>Search</button>
      </div>

      {/* Banner Section */}
      <div className="banner">
        <h2>Convenient, Affordable, and Sustainable Travel</h2>
      </div>

      {/* Login/Signup Buttons */}
      <div className="auth-buttons">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>

      {/* Preview Cards */}
      <div className="service-cards">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

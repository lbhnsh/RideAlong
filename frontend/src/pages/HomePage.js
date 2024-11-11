// frontend/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransportCard from '../components/TransportCard';
import './HomePage.css'; // Import the CSS file

function HomePage() {
  const [transportOptions, setTransportOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/transport-options');
        setTransportOptions(response.data);
      } catch (err) {
        console.error("Failed to fetch transport options", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="homepage">
      <h1>Welcome to the Multi-Modal Ride-Sharing Platform</h1>
      <div className="transport-options">
        {transportOptions.map((option) => (
          <div className="transport-card" key={option._id}>
            <TransportCard option={option} />
            <div className="details-button">
              <span>Explore</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

import React from 'react';
import MapComponent from '../components/MapComponent';
import './HomeSection.css';
const HomeSection = () => {
  return (
    <div className="section">
      <MapComponent />
      <h1>Welcome to <span className="highlight1">Ride</span><span className="highlight2">Along</span>, where are you heading to?</h1>
      {/* <p>This is the home section where you can explore the platform.</p> */}
    </div>
  );
};

export default HomeSection;

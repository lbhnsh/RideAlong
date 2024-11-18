import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';

import HomeSection from '../sections/HomeSection';
import ServicesSection from '../sections/ServicesSection';
import ActivitySection from '../sections/ActivitySection';
import AccountSection from '../sections/AccountSection';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'services':
        return <ServicesSection />;
      case 'activity':
        return <ActivitySection />;
      case 'account':
        return <AccountSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-tabs">
          <button
            className={`tab ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => setActiveSection('home')}
          >
            Home
          </button>
          <button
            className={`tab ${activeSection === 'services' ? 'active' : ''}`}
            onClick={() => setActiveSection('services')}
          >
            Services
          </button>
          <button
            className={`tab ${activeSection === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveSection('activity')}
          >
            Activity
          </button>
          <button
            className={`tab ${activeSection === 'account' ? 'active' : ''}`}
            onClick={() => setActiveSection('account')}
          >
            Account
          </button>
        </div>
        <div className="home-content">{renderSection()}</div>
      </div>
    </>
  );
};

export default Home;

import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <img src="/logo.png" alt="RideAlong Logo" className="navbar-logo" />
        <span className="navbar-title">RideAlong</span>
      </div>
    </header>
  );
};

export default Navbar;

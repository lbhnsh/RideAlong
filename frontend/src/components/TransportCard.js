// frontend/src/components/TransportCard.js
import React from 'react';

function TransportCard({ option }) {
  return (
    <div className="transport-card">
      {/* <img src={option.icon} alt={option.name} /> */}
      <h3>{option.name}</h3>
      <p>{option.description}</p>
    </div>
  );
}

export default TransportCard;

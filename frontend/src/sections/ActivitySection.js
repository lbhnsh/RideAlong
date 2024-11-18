import React from 'react';
import "./ActivitySection.css";

function ActivitySection() {
  const pastRides = JSON.parse(sessionStorage.getItem('pastRides')) || [];

  return (
    <div className="activity-container">
      <h2>Past Rides</h2>
      <div className="ride-cards-container">
        {pastRides.length > 0 ? (
          pastRides.map((ride, index) => (
            <div key={index} className="ride-card">
              {/* <h3>{ride.driverName}</h3> */}
              {/* <p><strong>Vicinity:</strong> {ride.vicinity}</p> */}
              <p><strong>Vehicle Details:</strong> {ride.vehicleDetails}</p>
              <p><strong>Contact:</strong> {ride.contact}</p>
              <p><strong>Rating:</strong> {ride.rating} ⭐</p>
              <p><strong>Trip:</strong> {ride.tripDetails.start} → {ride.tripDetails.destination}</p>
              {/* <p><strong>Cost:</strong> ${ride.price}</p> Display cost here */}
            </div>
          ))
        ) : (
          <p>No past rides available.</p>
        )}
      </div>
    </div>
  );
}

export default ActivitySection;

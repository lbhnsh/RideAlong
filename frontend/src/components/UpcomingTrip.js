// frontend/src/components/UpcomingTrip.js
import React from 'react';

function UpcomingTrip({ trip }) {
  return (
    <div className="upcoming-trip">
      <p>From: {trip.start}</p>
      <p>To: {trip.end}</p>
      <p>Mode: {trip.mode}</p>
      <p>Time: {trip.time}</p>
      <p>Date: {trip.date}</p>
    </div>
  );
}

export default UpcomingTrip;

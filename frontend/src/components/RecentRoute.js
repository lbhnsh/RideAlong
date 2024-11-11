// frontend/src/components/RecentRoute.js
import React from 'react';

function RecentRoute({ route }) {
  return (
    <div className="recent-route">
      <p>From: {route.start}</p>
      <p>To: {route.end}</p>
      <p>Mode: {route.mode}</p>
      <p>Time: {route.time}</p>
    </div>
  );
}

export default RecentRoute;

// frontend/src/components/Recommendation.js
import React from 'react';

function Recommendation({ recommendation }) {
  return (
    <div className="recommendation">
      <p>From: {recommendation.start}</p>
      <p>To: {recommendation.end}</p>
      <p>Mode: {recommendation.mode}</p>
      <p>Reason: {recommendation.reason}</p>
    </div>
  );
}

export default Recommendation;

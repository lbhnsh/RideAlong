// frontend/src/pages/RouteSelection.js
import React, { useState } from 'react';
import axios from 'axios';

function RouteSelection() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [mode, setMode] = useState('car');
  const [routes, setRoutes] = useState([]);
  const [filters, setFilters] = useState({ cost: true, convenience: false, sustainability: false });

  const handleSearchRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/routes', {
        params: { start, end, mode },
      });
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes", error);
    }
  };

  return (
    <div className="route-selection">
      <h1>Plan Your Route</h1>

      <div className="input-section">
        <input type="text" value={start} onChange={(e) => setStart(e.target.value)} placeholder="Starting Point" />
        <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="Destination" />
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="pedestrian">Walk</option>
        </select>
        <button onClick={handleSearchRoutes}>Search Routes</button>
      </div>

      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={filters.cost}
            onChange={() => setFilters({ ...filters, cost: !filters.cost })}
          />
          Cost
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.convenience}
            onChange={() => setFilters({ ...filters, convenience: !filters.convenience })}
          />
          Convenience
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.sustainability}
            onChange={() => setFilters({ ...filters, sustainability: !filters.sustainability })}
          />
          Sustainability
        </label>
      </div>

      <div className="route-options">
        {routes.map((route, index) => (
          <div key={index} className="route-card">
            <p>Distance: {route.distance} meters</p>
            <p>Travel Time: {Math.round(route.travelTime / 60)} mins</p>
            <p>Estimated Cost: ${route.costEstimate.toFixed(2)}</p>
            <p>Environmental Impact: {route.environmentalImpact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RouteSelection;

/* global H */
import React, { useState, useEffect } from "react";
import './RouteSelection.css'; 

const RouteSelection = () => {
  const [map, setMap] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  // Initialize the map
  useEffect(() => {
    if (window.H) {
      const platform = new window.H.service.Platform({
        apikey: 'd2HJkl6aWcEoNbt6AHg4bFPl-s_XCBHdv-MBVhfZGWI'
      });
      const defaultLayers = platform.createDefaultLayers();
      const mapContainer = document.getElementById("mapContainer");
      const mapInstance = new window.H.Map(mapContainer, defaultLayers.vector.normal.map, {
        center: { lat: 37.7749, lng: -122.4194 }, // Default center (San Francisco)
        zoom: 12
      });
      setMap(mapInstance);

      // Add map events
      mapInstance.addEventListener("tap", (evt) => handleMapClick(evt));
    }
  }, []);

  // Handle map click to get coordinates
  const handleMapClick = (event) => {
    const coords = map.screenToGeo(event.currentPointer.viewportX, event.currentPointer.viewportY);

    if (!start) {
      setStart(coords);
    } else {
      setEnd(coords);
    }
  };

  const resetMarkers = () => {
    setStart(null);
    setEnd(null);
  };

  return (
    <div className="route-selection-container">
      <h1>Plan Your Route</h1>

      {/* Input Section */}
      <div className="input-section">
        <button onClick={resetMarkers}>Reset</button>
      </div>

      {/* Coordinate Display Section */}
      <div className="coordinate-display">
        <p><strong>Start:</strong> {start ? `${start.lat.toFixed(4)}, ${start.lng.toFixed(4)}` : 'Not selected'}</p>
        <p><strong>End:</strong> {end ? `${end.lat.toFixed(4)}, ${end.lng.toFixed(4)}` : 'Not selected'}</p>
      </div>

      {/* Map Container */}
      <div id="mapContainer"></div>

      {/* You can add route information card or other content here */}
    </div>
  );
};

export default RouteSelection;

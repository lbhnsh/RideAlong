/* global H */

import React, { useState, useEffect } from 'react';
import './MapComponent.css';
import RideFinder from './RideFinder';  
const HERE_API_KEY = 'd2HJkl6aWcEoNbt6AHg4bFPl-s_XCBHdv-MBVhfZGWI';

function MapComponent() {
  const [start, setStart] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  const [showRideFinder, setShowRideFinder] = useState(false);

  useEffect(() => {
    const platform = new H.service.Platform({
      apikey: HERE_API_KEY,
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
      center: { lat: 19.0760, lng: 72.8777 },
      zoom: 11,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    map.addEventListener('tap', (evt) => {
      const coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      handleMapClick(coord, map);
    });

    return () => map.dispose();
  }, [start, destination]);

  const handleMapClick = (coord, map) => {
    const mapContainer = document.getElementById('map');
    const screenCoord = map.geoToScreen(coord);

    if (!start) {
      setStart(coord);
      clearExistingMarkers('start-marker');
      addCSSMarker(mapContainer, screenCoord.x, screenCoord.y, 'start-marker', 'Start');
      fetchNearestLocation(coord, setStartLocation);
    } else if (!destination) {
      setDestination(coord);
      clearExistingMarkers('destination-marker');
      addCSSMarker(mapContainer, screenCoord.x, screenCoord.y, 'destination-marker', 'Destination');
      fetchNearestLocation(coord, setDestinationLocation);
      calculateDistance(coord);
    }
  };

  const fetchNearestLocation = async (coord, setLocation) => {
    const { lat, lng } = coord;
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&lang=en-US&apikey=${HERE_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const address = data.items[0]?.address?.label || 'Location not found';
      setLocation(address);
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocation('Error fetching location');
    }
  };

  const addCSSMarker = (mapContainer, x, y, className) => {
    const marker = document.createElement('div');
    marker.className = `css-marker ${className}`;
    marker.style.left = `${x}px`;
    marker.style.top = `${y}px`;
    mapContainer.appendChild(marker);
  };

  const clearExistingMarkers = (className) => {
    const existingMarkers = document.querySelectorAll(`.css-marker.${className}`);
    existingMarkers.forEach((marker) => marker.remove());
  };

  const calculateDistance = (destinationCoord) => {
    if (start) {
      const dist = haversine(start.lat, start.lng, destinationCoord.lat, destinationCoord.lng);
      setDistance(dist);

      const board = document.getElementById('distance-board');
      board.classList.add('visible');
    }
  };

  const toRad = (degrees) => degrees * Math.PI / 180;

  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // Button handler to switch to RideFinder and pass data
  const handleShowRideFinder = () => {
    setShowRideFinder(true);
  };

  if (showRideFinder) {
    // Pass coordinates to RideFinder as props
    return <RideFinder start={start} destination={destination} startLocation={startLocation} destinationLocation={destinationLocation} />;
  }

  return (
    <div>
      <div id="map" style={{ height: '500px', width: '100%', position: 'relative' }}></div>
      <div id="distance-board" className="distance-board">
        {start && !destination && (
          <>
            <h3>Start Point</h3>
            <p><strong>Coordinates:</strong> {start.lat.toFixed(4)}, {start.lng.toFixed(4)}</p>
            <p><strong>Location:</strong> {startLocation || 'Fetching...'}</p>
          </>
        )}
        {start && destination && (
          <>
            <div className="trip-detail">
              <div className='distance'>Trip Summary</div>
              <p><strong>Start:</strong> {startLocation || 'Fetching...'}</p>
              <p><strong>Coordinates:</strong> {start.lat.toFixed(4)}, {start.lng.toFixed(4)}</p>
              <p><strong>Destination:</strong> {destinationLocation || 'Fetching...'}</p>
              <p><strong>Coordinates:</strong> {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}</p>
            </div>
            <div className="distance">Distance: {distance ? distance.toFixed(2) : 0} km</div>
            <button onClick={handleShowRideFinder}>Go to Ride Finder</button>
          </>
        )}
      </div>
    </div>
  );
}

export default MapComponent;

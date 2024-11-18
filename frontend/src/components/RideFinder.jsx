import React, { useState, useEffect } from 'react';
import './RideFinder.css';

function RideFinder({ start, destination, startLocation, destinationLocation }) {
  const [activeSection, setActiveSection] = useState('bookCab');
  const [cardsData, setCardsData] = useState({
    bookCab: [],
    accompanyBiker: [],
    sharedCab: [],
  });
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [suggestedRides, setSuggestedRides] = useState([]); // Stores top suggestions
  const [isSuggestionModalOpen, setSuggestionModalOpen] = useState(false);

  const generateVehicleNumber = () =>
    `MH-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(1000 + Math.random() * 9000)}`;

  const generateCards = (type, count) => {
    const cards = [];
    for (let i = 0; i < count; i++) {
      if (type === 'bookCab') {
        cards.push({
          driverName: `Driver ${Math.floor(Math.random() * 100) + 1}`,
          vicinity: `${(Math.random() * 4.9 + 0.1).toFixed(2)} km`,
          rating: (Math.random() * 2 + 3).toFixed(1),
          contact: `+91 ${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          vehicleNumber: generateVehicleNumber(),
          carName: `Car Model ${Math.floor(Math.random() * 100) + 1}`,
          price: Math.floor(Math.random() * 500) + 200, // Random price between 200 and 700
        });
      } else if (type === 'accompanyBiker') {
        cards.push({
          riderName: `Rider ${Math.floor(Math.random() * 100) + 1}`,
          vicinity: `${(Math.random() * 4.9 + 0.1).toFixed(2)} km`,
          rating: (Math.random() * 2 + 3).toFixed(1),
          contact: `+91 ${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          vehicleNumber: generateVehicleNumber(),
          carName: `Bike Model ${Math.floor(Math.random() * 100) + 1}`,
          price: Math.floor(Math.random() * 300) + 100, // Random price between 100 and 400
        });
      } else if (type === 'sharedCab') {
        const passengers = Array.from({ length: Math.floor(Math.random() * 4) + 1 }, () =>
          (Math.random() * 2 + 3).toFixed(1)
        );
        cards.push({
          driverName: `Driver ${Math.floor(Math.random() * 100) + 1}`,
          vicinity: `${(Math.random() * 4.9 + 0.1).toFixed(2)} km`,
          rating: (Math.random() * 2 + 3).toFixed(1),
          contact: `+91 ${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          vehicleNumber: generateVehicleNumber(),
          carName: `Car Model ${Math.floor(Math.random() * 100) + 1}`,
          price: Math.floor(Math.random() * 500) + 150, // Random price between 150 and 650
          vacancy: passengers.length,
          passengerRatings: passengers,
        });
      }
    }
    return cards;
  };

  useEffect(() => {
    setCardsData({
      bookCab: generateCards('bookCab', Math.floor(Math.random() * 5) + 1),
      accompanyBiker: generateCards('accompanyBiker', Math.floor(Math.random() * 5) + 1),
      sharedCab: generateCards('sharedCab', Math.floor(Math.random() * 5) + 1),
    });
  }, []);

  const openModal = (card) => {
    setModalData(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const confirmRide = () => {
    const pastRides = JSON.parse(sessionStorage.getItem('pastRides')) || [];
    const newRide = {
      ...modalData,
      tripDetails: {
        start: startLocation,
        destination: destinationLocation,
        coordinates: {
          start: start,
          destination: destination,
        },
      },
    };
    pastRides.push(newRide);
    sessionStorage.setItem('pastRides', JSON.stringify(pastRides));
    closeModal();
  };

  const getSuggestions = () => {
    const allRides = [
      ...cardsData.bookCab,
      ...cardsData.accompanyBiker,
      ...cardsData.sharedCab,
    ];

    const pastRides = JSON.parse(sessionStorage.getItem('pastRides')) || [];
    const preferredPrice = pastRides.length
      ? pastRides.reduce((sum, ride) => sum + ride.price, 0) / pastRides.length
      : 300;

    const sortedRides = allRides
      .sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating; // Higher rating first
        if (a.vicinity !== b.vicinity) return parseFloat(a.vicinity) - parseFloat(b.vicinity); // Closer vicinity
        return Math.abs(a.price - preferredPrice) - Math.abs(b.price - preferredPrice); // Closest price to preferred
      })
      .slice(0, 3); // Top 3 rides

    setSuggestedRides(sortedRides);
    setSuggestionModalOpen(true);
  };

  const renderSuggestionModal = () =>
    suggestedRides.map((ride, index) => (
      <div key={index} className="suggestion-card">
        <h3>{ride.driverName || ride.riderName}</h3>
        <p><strong>Vicinity:</strong> {ride.vicinity}</p>
        <p><strong>Rating:</strong> {ride.rating} ⭐</p>
        <p><strong>Price:</strong> ₹{ride.price}</p>
        {ride.carName && <p><strong>Vehicle:</strong> {ride.carName}</p>}
        {ride.vacancy && <p><strong>Vacancy:</strong> {ride.vacancy} seats</p>}
      </div>
    ));

  const renderCards = (cards) => (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div key={index} className="card" onClick={() => openModal(card)}>
          <p><strong>Vicinity:</strong> {card.vicinity}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="ride-finder-container">
      <div className="tab-menu">
        <button
          className={`tab-button ${activeSection === 'bookCab' ? 'active' : ''}`}
          onClick={() => setActiveSection('bookCab')}
        >
          Book Your Own Cab
        </button>
        <button
          className={`tab-button ${activeSection === 'accompanyBiker' ? 'active' : ''}`}
          onClick={() => setActiveSection('accompanyBiker')}
        >
          Accompany a Biker
        </button>
        <button
          className={`tab-button ${activeSection === 'sharedCab' ? 'active' : ''}`}
          onClick={() => setActiveSection('sharedCab')}
        >
          Join a Shared Cab
        </button>
      </div>

      <div className="trip-details">
        {start && destination ? (
          <div>
            <h3>Trip Details:</h3>
            <p><strong>Start Location:</strong> {startLocation}</p>
            <p><strong>Destination Location:</strong> {destinationLocation}</p>
          </div>
        ) : (
          <p>No trip details available.</p>
        )}
      </div>

      <button className="suggestions-button" onClick={getSuggestions}>
        Get Top Suggestions
      </button>

      <div className="section-content">{renderCards(cardsData[activeSection])}</div>

      {isSuggestionModalOpen && (
        <div className="modal-overlay" onClick={() => setSuggestionModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Top Suggested Rides</h3>
            {renderSuggestionModal()}
            <button className="close-button" onClick={() => setSuggestionModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {isModalOpen && modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalData.driverName || modalData.riderName}</h3>
            <p><strong>Vicinity:</strong> {modalData.vicinity}</p>
            <p><strong>Rating:</strong> {modalData.rating} ⭐</p>
            {modalData.contact && <p><strong>Contact:</strong> {modalData.contact}</p>}
            {modalData.vehicleNumber && <p><strong>Vehicle Number:</strong> {modalData.vehicleNumber}</p>}
            {modalData.carName && <p><strong>Car Name:</strong> {modalData.carName}</p>}
            {modalData.vacancy && <p><strong>Vacancy:</strong> {modalData.vacancy} seats</p>}
            <button className="confirm-button" onClick={confirmRide}>
              Confirm
            </button>
            <button className="cancel-button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RideFinder;

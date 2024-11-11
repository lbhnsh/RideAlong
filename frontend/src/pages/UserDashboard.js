// frontend/src/pages/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecentRoute from '../components/RecentRoute';
import UpcomingTrip from '../components/UpcomingTrip';
import Recommendation from '../components/Recommendation';

function UserDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get('http://localhost:5000/api/user-dashboard');
        setDashboardData(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    }
    fetchDashboardData();
  }, []);

  if (!dashboardData) return <p>Loading...</p>;

  return (
    <div className="user-dashboard">
      <h1>Your Dashboard</h1>

      <section>
        <h2>Recent Routes</h2>
        <div className="recent-routes">
          {dashboardData.recentRoutes.map((route) => (
            <RecentRoute key={route.id} route={route} />
          ))}
        </div>
      </section>

      <section>
        <h2>Upcoming Trips</h2>
        <div className="upcoming-trips">
          {dashboardData.upcomingTrips.map((trip) => (
            <UpcomingTrip key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      <section>
        <h2>Personalized Recommendations</h2>
        <div className="recommendations">
          {dashboardData.personalizedRecommendations.map((recommendation) => (
            <Recommendation key={recommendation.id} recommendation={recommendation} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;

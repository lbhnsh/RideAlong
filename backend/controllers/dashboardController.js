// backend/controllers/dashboardController.js
exports.getUserDashboardData = (req, res) => {
    // Dummy data for the User Dashboard
    const dashboardData = {
      recentRoutes: [
        { id: "1", start: "Downtown", end: "University", mode: "Bus", time: "15 mins" },
        { id: "2", start: "Home", end: "Office", mode: "Car", time: "25 mins" },
      ],
      upcomingTrips: [
        { id: "3", start: "Park", end: "Mall", mode: "Bike", time: "10 mins", date: "2023-12-01" },
        { id: "4", start: "Station", end: "Airport", mode: "Train", time: "35 mins", date: "2023-12-02" },
      ],
      personalizedRecommendations: [
        { id: "5", start: "Home", end: "Gym", mode: "Bike", reason: "Cost-effective and eco-friendly" },
        { id: "6", start: "Downtown", end: "Cafe", mode: "Walk", reason: "Good for short distances" },
      ],
    };
  
    res.status(200).json(dashboardData);
  };
  
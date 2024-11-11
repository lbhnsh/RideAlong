// backend/controllers/hereApiController.js
const axios = require('axios');

const HERE_API_KEY = process.env.HERE_API_KEY;

exports.getRoutes = async (req, res) => {
  const { start, end, mode } = req.query;

  if (!start || !end || !mode) {
    return res.status(400).json({ error: "Please provide start, end, and mode parameters." });
  }

  try {
    const response = await axios.get(`https://router.hereapi.com/v8/routes`, {
      params: {
        transportMode: mode,             // Modes: car, bike, pedestrian, etc.
        origin: start,                   // Format: "latitude,longitude"
        destination: end,                // Format: "latitude,longitude"
        return: "summary",
        apiKey: HERE_API_KEY,
      },
    });

    // Extract relevant data
    const routes = response.data.routes.map(route => {
      const distance = route.sections[0]?.summary?.distance || 0;
      const travelTime = route.sections[0]?.summary?.duration || 0;
      const costEstimate = calculateCost(distance, mode);

      return {
        distance,
        travelTime,
        costEstimate,
        environmentalImpact: calculateEnvironmentalImpact(mode),
      };
    });

    res.status(200).json(routes);

  } catch (error) {
    console.error("Error fetching data from HERE API:", error.message);
    res.status(500).json({ error: "Failed to fetch routes", details: error.message });
  }
};

// Helper function for cost based on distance and mode
function calculateCost(distance, mode) {
  const costPerKm = {
    car: 0.5,
    bike: 0.1,
    pedestrian: 0, // Free for walking
  };
  return (distance / 1000) * (costPerKm[mode] || 0.5);  // Default to car rate if mode is missing
}

// Helper function for environmental impact based on mode
function calculateEnvironmentalImpact(mode) {
  const impacts = {
    car: 1.0,     // Higher impact
    bike: 0.1,    // Lower impact
    pedestrian: 0.05, // Lowest impact
  };
  return impacts[mode] || 1.0; // Default to car impact if mode is missing
}

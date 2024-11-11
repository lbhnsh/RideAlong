// backend/controllers/hereApiController.js
const axios = require('axios');

// Configure your HERE Maps API credentials in the environment
const HERE_API_KEY = process.env.HERE_API_KEY;

exports.getRoutes = async (req, res) => {
  const { start, end, mode } = req.query;

  try {
    const response = await axios.get(`https://router.hereapi.com/v8/routes`, {
      params: {
        transportMode: mode,  // car, bike, pedestrian, etc.
        origin: start,
        destination: end,
        return: "summary,travelSummary",
        apiKey: HERE_API_KEY,
      },
    });

    const routes = response.data.routes.map(route => ({
      distance: route.sections[0].summary.distance,
      travelTime: route.sections[0].summary.duration,
      costEstimate: calculateCost(route.sections[0].summary.distance),  // Placeholder function
      environmentalImpact: calculateEnvironmentalImpact(mode),           // Placeholder function
    }));

    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch routes", details: error.message });
  }
};

// Example cost calculation (based on distance or other factors)
function calculateCost(distance) {
  return (distance / 1000) * 0.5; // $0.50 per kilometer as an example
}

// Example environmental impact calculation
function calculateEnvironmentalImpact(mode) {
  const impacts = { car: 1.0, bike: 0.1, pedestrian: 0.05 };
  return impacts[mode] || 1.0;
}

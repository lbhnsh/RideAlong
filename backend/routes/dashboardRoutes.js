// backend/routes/dashboardRoutes.js
const express = require('express');
const { getUserDashboardData } = require('../controllers/dashboardController');
const router = express.Router();

router.get('/user-dashboard', getUserDashboardData);

module.exports = router;

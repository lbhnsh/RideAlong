// backend/routes/transportRoutes.js
const express = require('express');
const { getAllTransportOptions } = require('../controllers/transportController');
const router = express.Router();

router.get('/transport-options', getAllTransportOptions);

module.exports = router;

// backend/routes/hereRoutes.js
const express = require('express');
const { getRoutes } = require('../controllers/hereApiController');
const router = express.Router();

router.get('/routes', getRoutes);

module.exports = router;

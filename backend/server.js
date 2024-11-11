// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const transportRoutes = require('./routes/transportRoutes');
app.use('/api', transportRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api', dashboardRoutes);

const hereRoutes = require('./routes/hereRoutes');
app.use('/api', hereRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));




// backend/models/TransportOption.js
const mongoose = require('mongoose');

const TransportOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model("TransportOption", TransportOptionSchema);

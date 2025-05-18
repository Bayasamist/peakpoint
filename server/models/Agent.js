const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  agency: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agent', agentSchema);

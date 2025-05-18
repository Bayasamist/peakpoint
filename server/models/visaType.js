const mongoose = require('mongoose');

const visaTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VisaType', visaTypeSchema);

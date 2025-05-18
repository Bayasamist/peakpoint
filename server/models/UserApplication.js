const mongoose = require('mongoose');

const userApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  education: String,
  experience: String,
  country: String,
  visaType: String,
  message: String,
  passportImage: String,
  ieltsFile: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserApplication', userApplicationSchema);

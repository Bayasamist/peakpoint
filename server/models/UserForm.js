const mongoose = require('mongoose');

const userFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  education: String,
  experience: String,
  country: String,
  visaType: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserForm', userFormSchema);

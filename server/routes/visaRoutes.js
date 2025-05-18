const express = require('express');
const router = express.Router();
const VisaType = require('../models/visaType');
const { verifyToken } = require('../middleware/authMiddleware');

// GET /api/visas
router.get('/', async (req, res) => {
  try {
    const visas = await VisaType.find().sort({ createdAt: -1 });
    res.json(visas);
  } catch (err) {
    console.error("Error fetching visas:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


// POST /api/visas (protected)
router.post('/', verifyToken, async (req, res) => {
  const { type, description, country } = req.body;
  if (!type || !description) {
    return res.status(400).json({ error: "Type and description are required." });
  }

  try {
    const newVisa = new VisaType({ type, description, country });
    await newVisa.save();
    res.status(201).json({ message: "Visa type added successfully." });
  } catch (err) {
    res.status(500).json({ error: "Could not save visa type" });
  }
});

module.exports = router;

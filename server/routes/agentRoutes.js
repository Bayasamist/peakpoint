const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');

// GET /api/agents
router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: -1 });
    res.json(agents);
  } catch (err) {
    console.error("Error fetching agents:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/agents
router.post('/', async (req, res) => {
  const { name, agency, country, email, phone, description } = req.body;

  if (!name || !agency || !country) {
    return res.status(400).json({ error: "Name, agency, and country are required." });
  }

  try {
    const newAgent = new Agent({ name, agency, country, email, phone, description });
    await newAgent.save();
    res.status(201).json({ message: "Agent added successfully." });
  } catch (err) {
    console.error("Error saving agent:", err.message);
    res.status(500).json({ error: "Could not save agent" });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage'); // ✅ import model


const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Your message has been saved!" });
  } catch (err) {
    console.error("Error saving message:", err.message);
    res.status(500).json({ error: "Something went wrong. Try again later." });
  }
});

module.exports = router;

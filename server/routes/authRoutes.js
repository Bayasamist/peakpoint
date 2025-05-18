const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const router = express.Router();

// POST /api/auth/register (Run once to create admin user)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existing = await AdminUser.findOne({ email });
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new AdminUser({ email, password: hashed });
  await user.save();
  res.json({ message: 'Admin created' });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await AdminUser.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

module.exports = router;

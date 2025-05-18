const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const UserApplication = require('../models/UserApplication');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST /api/user-application
router.post('/', upload.fields([
  { name: 'passportImage', maxCount: 1 },
  { name: 'ieltsFile', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, email, phone, education, experience, country, visaType, message } = req.body;

    const application = new UserApplication({
      name,
      email,
      phone,
      education,
      experience,
      country,
      visaType,
      message,
      passportImage: req.files.passportImage?.[0]?.filename || '',
      ieltsFile: req.files.ieltsFile?.[0]?.filename || ''
    });

    await application.save();
    res.json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Submission failed.' });
  }
});

module.exports = router;

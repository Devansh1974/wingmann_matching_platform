const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, gender, phone, answers } = req.body;
    
    // Simple validation
    if (!name || !gender || !phone || !answers) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = new User({
      name,
      gender,
      phone,
      answers
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

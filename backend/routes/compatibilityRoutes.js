const express = require('express');
const User = require('../models/User');
const { calculateCompatibility } = require('../utils/compatibilityAlgorithm');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // 1. Find the current user
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 2. Find users of opposite gender (Not self)
    const oppositeGender = currentUser.gender === 'Male' ? 'Female' : 'Male';
    const potentialMatches = await User.find({ 
      gender: oppositeGender,
      _id: { $ne: currentUser._id }
    });

    // 3. Run compatibility algorithm for all
    const matchPromises = potentialMatches.map(async (otherUser) => {
      const percentage = await calculateCompatibility(currentUser, otherUser);
      return {
        _id: otherUser._id,
        name: otherUser.name,
        compatibility: percentage
      };
    });

    const matches = await Promise.all(matchPromises);

    // 4. Return sorted results (highest first)
    matches.sort((a, b) => b.compatibility - a.compatibility);

    res.json(matches);

  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

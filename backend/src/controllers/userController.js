// backend/src/controllers/userController.js

const User = require('../models/User');

exports.setupOnboarding = async (req, res) => {
  try {
    const { businessName, goals, audience } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { businessName, goals, audience, onboardingCompleted: true },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// backend/src/controllers/strategyController.js

const axios = require('axios');
const User = require('../models/User');

exports.generateStrategy = async (req, res) => {
  try {
    // Mock AI call (e.g., to GPT-4 API)
    const response = await axios.post(
      'https://api.openai.com/v1/strategy', // Placeholder
      { userId: req.user.id },
      { headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` } }
    );
    const strategy = response.data || {
      contentPlan: [
        { id: '1', date: '2025-11-01', type: 'post', description: 'Promote new product', hashtags: ['#product', '#sale'] },
        { id: '2', date: '2025-11-02', type: 'reel', description: 'Behind-the-scenes', hashtags: ['#bts', '#brand'] },
      ],
      platforms: ['instagram', 'facebook'],
      seoRecommendations: 'Optimize posts with keywords',
    };
    res.json(strategy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.confirmStrategy = async (req, res) => {
  try {
    const { platforms, strategy } = req.body;
    await User.findByIdAndUpdate(req.user.id, { strategy: { platforms, contentPlan: strategy.contentPlan } });
    res.json({ selectedPlatforms: platforms, confirmedStrategy: strategy });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
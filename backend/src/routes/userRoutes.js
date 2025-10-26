// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { setupOnboarding, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/onboarding', authMiddleware, setupOnboarding);
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
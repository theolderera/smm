// backend/src/routes/brandingRoutes.js

const express = require('express');
const router = express.Router();
const { generateBranding, selectBranding } = require('../controllers/brandingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate', authMiddleware, generateBranding);
router.post('/select', authMiddleware, selectBranding);

module.exports = router;
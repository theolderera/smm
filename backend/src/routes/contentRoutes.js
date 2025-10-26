// backend/src/routes/contentRoutes.js

const express = require('express');
const router = express.Router();
const { generateContent, scheduleContent } = require('../controllers/contentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate', authMiddleware, generateContent);
router.post('/schedule', authMiddleware, scheduleContent);

module.exports = router;
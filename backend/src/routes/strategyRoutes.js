// backend/src/routes/strategyRoutes.js

const express = require('express');
const router = express.Router();
const { generateStrategy, confirmStrategy } = require('../controllers/strategyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate', authMiddleware, generateStrategy);
router.post('/confirm', authMiddleware, confirmStrategy);

module.exports = router;
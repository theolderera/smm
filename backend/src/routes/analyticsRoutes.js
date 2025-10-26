// backend/src/routes/analyticsRoutes.js

const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, getDashboardData);

module.exports = router;
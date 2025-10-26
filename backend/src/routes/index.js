// backend/src/routes/index.js

const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const brandingRoutes = require('./brandingRoutes');
const strategyRoutes = require('./strategyRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const academyRoutes = require('./academyRoutes');
const contentRoutes = require('./contentRoutes');

router.use('/user', userRoutes);
router.use('/branding', brandingRoutes);
router.use('/strategy', strategyRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/academy', academyRoutes);
router.use('/content', contentRoutes);

module.exports = router;
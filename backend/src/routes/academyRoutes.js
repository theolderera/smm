// backend/src/routes/academyRoutes.js

const express = require('express');
const router = express.Router();
const { getAcademyCourses } = require('../controllers/academyController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/courses', authMiddleware, getAcademyCourses);

module.exports = router;
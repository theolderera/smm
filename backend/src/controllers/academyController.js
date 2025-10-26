// backend/src/controllers/academyController.js

const Course = require('../models/Course');

exports.getAcademyCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
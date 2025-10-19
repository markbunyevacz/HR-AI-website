const express = require('express');
const router = express.Router();
const { Course, Lesson, User } = require('../models');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Get all published courses with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, level, search } = req.query;
    const offset = (page - 1) * limit;

    const where = { isPublished: true };
    if (category) where.category = category;
    if (level) where.level = level;
    if (search) {
      where.title = { [require('sequelize').Op.iLike]: `%${search}%` };
    }

    const { count, rows } = await Course.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message,
    });
  }
});

// Get single course by ID with lessons
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: Lesson,
          attributes: ['id', 'title', 'order', 'type', 'duration'],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message,
    });
  }
});

// Create new course (instructor/admin only)
router.post('/', authMiddleware, roleMiddleware(['instructor', 'admin']), async (req, res) => {
  try {
    const { title, description, shortDescription, category, level, duration, imageUrl } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Course title is required',
      });
    }

    const course = await Course.create({
      title,
      description,
      shortDescription,
      category,
      level,
      duration,
      imageUrl,
      instructorId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message,
    });
  }
});

// Update course (instructor/admin only)
router.put('/:id', authMiddleware, roleMiddleware(['instructor', 'admin']), async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check authorization
    if (course.instructorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this course',
      });
    }

    const { title, description, shortDescription, category, level, duration, imageUrl, isPublished } = req.body;

    await course.update({
      title: title || course.title,
      description: description !== undefined ? description : course.description,
      shortDescription: shortDescription !== undefined ? shortDescription : course.shortDescription,
      category: category || course.category,
      level: level || course.level,
      duration: duration !== undefined ? duration : course.duration,
      imageUrl: imageUrl !== undefined ? imageUrl : course.imageUrl,
      isPublished: isPublished !== undefined ? isPublished : course.isPublished,
    });

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message,
    });
  }
});

// Delete course (instructor/admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['instructor', 'admin']), async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check authorization
    if (course.instructorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this course',
      });
    }

    await course.destroy();

    res.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message,
    });
  }
});

// Enroll user in course
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  try {
    const { UserCourseProgress } = require('../models');
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if already enrolled
    const existingProgress = await UserCourseProgress.findOne({
      where: { userId: req.user.id, courseId: req.params.id },
    });

    if (existingProgress) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course',
      });
    }

    const progress = await UserCourseProgress.create({
      userId: req.user.id,
      courseId: req.params.id,
    });

    // Increment enrollment count
    await course.increment('enrollmentCount');

    res.status(201).json({
      success: true,
      message: 'Enrolled in course successfully',
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error enrolling in course',
      error: error.message,
    });
  }
});

module.exports = router;

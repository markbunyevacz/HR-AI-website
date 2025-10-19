const express = require('express');
const router = express.Router();
const { Lesson, Course, UserLessonProgress } = require('../models');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Get lessons for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      where: { courseId: req.params.courseId },
      order: [['order', 'ASC']],
      attributes: { exclude: ['content'] },
    });

    res.json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lessons',
      error: error.message,
    });
  }
});

// Get single lesson
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    res.json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lesson',
      error: error.message,
    });
  }
});

// Create lesson (instructor/admin only)
router.post('/', authMiddleware, roleMiddleware(['instructor', 'admin']), async (req, res) => {
  try {
    const { courseId, title, description, content, videoUrl, resourceUrls, order, duration, type } = req.body;

    if (!courseId || !title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Course ID, title, and content are required',
      });
    }

    // Verify course ownership
    const course = await Course.findByPk(courseId);
    if (!course || (course.instructorId !== req.user.id && req.user.role !== 'admin')) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to add lessons to this course',
      });
    }

    const lesson = await Lesson.create({
      courseId,
      title,
      description,
      content,
      videoUrl,
      resourceUrls,
      order: order || 0,
      duration,
      type,
    });

    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating lesson',
      error: error.message,
    });
  }
});

// Update lesson (instructor/admin only)
router.put('/:id', authMiddleware, roleMiddleware(['instructor', 'admin']), async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Verify authorization
    const course = await Course.findByPk(lesson.courseId);
    if (course.instructorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this lesson',
      });
    }

    const { title, description, content, videoUrl, resourceUrls, order, duration, type, isPublished } = req.body;

    await lesson.update({
      title: title || lesson.title,
      description: description !== undefined ? description : lesson.description,
      content: content || lesson.content,
      videoUrl: videoUrl !== undefined ? videoUrl : lesson.videoUrl,
      resourceUrls: resourceUrls !== undefined ? resourceUrls : lesson.resourceUrls,
      order: order !== undefined ? order : lesson.order,
      duration: duration !== undefined ? duration : lesson.duration,
      type: type || lesson.type,
      isPublished: isPublished !== undefined ? isPublished : lesson.isPublished,
    });

    res.json({
      success: true,
      message: 'Lesson updated successfully',
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating lesson',
      error: error.message,
    });
  }
});

// Mark lesson as complete
router.post('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Find or create progress record
    const [progress, created] = await UserLessonProgress.findOrCreate({
      where: { userId: req.user.id, lessonId: req.params.id },
      defaults: {
        isCompleted: true,
        completedAt: new Date(),
        viewedAt: new Date(),
      },
    });

    if (!created) {
      await progress.update({
        isCompleted: true,
        completedAt: new Date(),
      });
    }

    res.json({
      success: true,
      message: 'Lesson marked as complete',
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error completing lesson',
      error: error.message,
    });
  }
});

module.exports = router;

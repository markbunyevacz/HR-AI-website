const express = require('express');
const router = express.Router();
const {
  issueCertificate,
  getUserCertificates,
  verifyCertificate,
  getCourseStatistics,
  issueDemoCertificate,
} = require('../services/certificateService');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Issue certificate (called after quiz pass/course completion)
router.post('/issue', authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required',
      });
    }

    const result = await issueCertificate(req.user.id, courseId);

    if (result.success) {
      res.status(201).json({
        success: true,
        message: result.message,
        data: result.certificate,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error issuing certificate',
      error: error.message,
    });
  }
});

// Get user's certificates
router.get('/my-certificates', authMiddleware, async (req, res) => {
  try {
    const certificates = await getUserCertificates(req.user.id);

    res.json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching certificates',
      error: error.message,
    });
  }
});

// Verify certificate (public endpoint)
router.get('/verify/:code', async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Verification code is required',
      });
    }

    const result = await verifyCertificate(code);

    res.json({
      success: result.valid,
      message: result.message,
      data: result.certificate || null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying certificate',
      error: error.message,
    });
  }
});

// Get course completion statistics
router.get('/stats/course/:courseId', authMiddleware, roleMiddleware(['instructor', 'admin']), async (req, res) => {
  try {
    const { courseId } = req.params;

    const stats = await getCourseStatistics(courseId);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course statistics',
      error: error.message,
    });
  }
});

// Admin endpoint: Issue demo certificate (for testing/demo purposes)
router.post('/demo/issue', authMiddleware, roleMiddleware(['admin', 'instructor']), async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const targetUserId = userId || req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required',
      });
    }

    const result = await issueDemoCertificate(targetUserId, courseId);

    if (result.success) {
      res.status(201).json({
        success: true,
        message: result.message,
        data: result.certificate,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error issuing demo certificate',
      error: error.message,
    });
  }
});

module.exports = router;

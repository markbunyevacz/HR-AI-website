const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ocrService = require('../services/ocrService');
const jobQueueService = require('../services/jobQueueService');
const { OCRResult } = require('../models');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/ocr');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not supported. Allowed: ${allowedTypes.join(', ')}`));
    }
  },
});

/**
 * @route POST /api/ocr/extract
 * @desc Extract text from a single image or PDF file
 * @access Private (Admin/Instructor)
 */
router.post(
  '/extract',
  authMiddleware,
  roleMiddleware(['admin', 'instructor']),
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const filePath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();

      console.log(`[OCR API] Processing file: ${req.file.originalname}`);

      let result;

      try {
        if (ext === '.pdf') {
          result = await ocrService.extractFromPdf(filePath, {
            preprocessImages: true,
          });
        } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          result = await ocrService.extractFromImage(filePath, {
            preprocessImage: true,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Unsupported file type',
          });
        }

        res.json({
          success: true,
          data: {
            ...result,
            uploadedFile: req.file.originalname,
            fileSize: req.file.size,
          },
        });
      } catch (ocrError) {
        console.error('OCR Processing Error:', ocrError);
        res.status(500).json({
          success: false,
          message: 'OCR processing failed',
          error: ocrError.message,
        });
      } finally {
        // Cleanup uploaded file
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } catch (error) {
      console.error('Error in OCR extract endpoint:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing file',
        error: error.message,
      });
    }
  }
);

/**
 * @route POST /api/ocr/extract-batch
 * @desc Extract text from multiple files
 * @access Private (Admin)
 */
router.post(
  '/extract-batch',
  authMiddleware,
  roleMiddleware(['admin']),
  upload.array('files', 10), // Max 10 files
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded',
        });
      }

      console.log(`[OCR API] Processing batch of ${req.files.length} files`);

      const results = [];
      const filePaths = req.files.map((f) => f.path);

      try {
        const batchResults = await ocrService.processBatch(filePaths, {
          preprocessImages: true,
        });

        results.push(
          ...batchResults.map((result, index) => ({
            ...result,
            originalFile: req.files[index].originalname,
            fileSize: req.files[index].size,
          }))
        );

        res.json({
          success: true,
          data: {
            processed: results.length,
            results,
            summary: {
              successful: results.filter((r) => r.success).length,
              failed: results.filter((r) => !r.success).length,
              averageConfidence:
                Math.round(
                  results.filter((r) => r.success).reduce((sum, r) => sum + r.confidence, 0) /
                    results.filter((r) => r.success).length
                ) || 0,
            },
          },
        });
      } catch (ocrError) {
        console.error('Batch OCR Processing Error:', ocrError);
        res.status(500).json({
          success: false,
          message: 'Batch OCR processing failed',
          error: ocrError.message,
        });
      } finally {
        // Cleanup uploaded files
        filePaths.forEach((filePath) => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
    } catch (error) {
      console.error('Error in OCR batch extract endpoint:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing batch',
        error: error.message,
      });
    }
  }
);

/**
 * @route POST /api/ocr/initialize
 * @desc Initialize OCR service (admin only)
 * @access Private (Admin)
 */
router.post('/initialize', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    console.log('[OCR API] Initializing OCR service...');

    await ocrService.initialize();

    const status = ocrService.getStatus();

    res.json({
      success: true,
      message: 'OCR service initialized successfully',
      data: status,
    });
  } catch (error) {
    console.error('Error initializing OCR service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize OCR service',
      error: error.message,
    });
  }
});

/**
 * @route GET /api/ocr/status
 * @desc Get OCR service status
 * @access Private (Admin)
 */
router.get('/status', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  try {
    const status = ocrService.getStatus();

    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error('Error getting OCR status:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving OCR status',
      error: error.message,
    });
  }
});

/**
 * @route POST /api/ocr/terminate
 * @desc Terminate OCR service (admin only)
 * @access Private (Admin)
 */
router.post('/terminate', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    console.log('[OCR API] Terminating OCR service...');

    await ocrService.terminate();

    res.json({
      success: true,
      message: 'OCR service terminated successfully',
    });
  } catch (error) {
    console.error('Error terminating OCR service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to terminate OCR service',
      error: error.message,
    });
  }
});

/**
 * @route GET /api/ocr/test
 * @desc Test OCR functionality with a sample image
 * @access Private (Admin)
 */
router.get('/test', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    console.log('[OCR API] Running OCR test...');

    // Create a simple test image path or provide guidance
    res.json({
      success: true,
      message: 'OCR service is ready for testing',
      instructions: {
        1: 'Use POST /api/ocr/extract to process a single file',
        2: 'Use POST /api/ocr/extract-batch to process multiple files',
        3: 'Supported formats: PDF, JPG, JPEG, PNG, GIF, WEBP',
        4: 'Max file size: 50MB',
        5: 'Max batch size: 10 files',
      },
      status: ocrService.getStatus(),
    });
  } catch (error) {
    console.error('Error running OCR test:', error);
    res.status(500).json({
      success: false,
      message: 'OCR test failed',
      error: error.message,
    });
  }
});

/**
 * @route POST /api/ocr/upload-cv
 * @desc Upload CV for async OCR processing with job queue
 * @access Private (Admin/Instructor)
 */
router.post(
  '/upload-cv',
  authMiddleware,
  roleMiddleware(['admin', 'instructor']),
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const filePath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();

      console.log(`[OCR API] Uploading CV for processing: ${req.file.originalname}`);

      // Create OCR result record
      const ocrResult = await OCRResult.create({
        userId: req.user.id,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: ext === '.pdf' ? 'pdf' : 'image',
        status: 'pending',
      });

      // Add to job queue
      const jobId = await jobQueueService.addOCRJob(filePath, req.user.id, {
        ocrResultId: ocrResult.id,
      });

      // Update OCR result with job ID
      await ocrResult.update({ jobId });

      res.json({
        success: true,
        message: 'CV uploaded for processing',
        jobId,
        ocrResultId: ocrResult.id,
      });
    } catch (error) {
      console.error('Error in CV upload:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading CV',
        error: error.message,
      });
    }
  }
);

/**
 * @route GET /api/ocr/user-jobs
 * @desc Get all OCR jobs for current user
 * @access Private (Admin/Instructor)
 */
router.get('/user-jobs', authMiddleware, roleMiddleware(['admin', 'instructor']), async (req, res) => {
  try {
    const jobs = await jobQueueService.getUserJobs(req.user.id);

    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error('Error getting user jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving jobs',
      error: error.message,
    });
  }
});

/**
 * @route GET /api/ocr/job/:jobId
 * @desc Get status of specific job
 * @access Private (Admin/Instructor)
 */
router.get('/job/:jobId', authMiddleware, roleMiddleware(['admin', 'instructor']), async (req, res) => {
  try {
    const { jobId } = req.params;

    const jobStatus = await jobQueueService.getJobStatus(jobId);

    res.json({
      success: true,
      data: jobStatus,
    });
  } catch (error) {
    console.error('Error getting job status:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving job status',
      error: error.message,
    });
  }
});

/**
 * @route POST /api/ocr/cancel-job/:jobId
 * @desc Cancel a specific job
 * @access Private (Admin/Instructor)
 */
router.post('/cancel-job/:jobId', authMiddleware, roleMiddleware(['admin', 'instructor']), async (req, res) => {
  try {
    const { jobId } = req.params;

    const success = await jobQueueService.cancelJob(jobId);

    if (success) {
      // Update OCR result status
      await OCRResult.update(
        { status: 'failed', errorMessage: 'Job cancelled by user' },
        { where: { jobId } }
      );

      res.json({
        success: true,
        message: 'Job cancelled successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }
  } catch (error) {
    console.error('Error cancelling job:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling job',
      error: error.message,
    });
  }
});

/**
 * @route GET /api/ocr/queue-stats
 * @desc Get queue statistics
 * @access Private (Admin)
 */
router.get('/queue-stats', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const stats = await jobQueueService.getQueueStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error getting queue stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving queue statistics',
      error: error.message,
    });
  }
});

/**
 * @route GET /api/ocr/results
 * @desc Get OCR results for current user
 * @access Private (Admin/Instructor)
 */
router.get('/results', authMiddleware, roleMiddleware(['admin', 'instructor']), async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let whereClause = { userId: req.user.id };

    if (status) {
      whereClause.status = status;
    }

    const { count, rows } = await OCRResult.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error getting OCR results:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving OCR results',
      error: error.message,
    });
  }
});

/**
 * @route GET /api/ocr/results/:id
 * @desc Get specific OCR result
 * @access Private (Admin/Instructor)
 */
router.get('/results/:id', authMiddleware, roleMiddleware(['admin', 'instructor']), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await OCRResult.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'OCR result not found',
      });
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error getting OCR result:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving OCR result',
      error: error.message,
    });
  }
});

/**
 * @route POST /api/ocr/cleanup
 * @desc Clean up old completed jobs
 * @access Private (Admin)
 */
router.post('/cleanup', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const cleanedCount = await jobQueueService.cleanupJobs();

    res.json({
      success: true,
      message: `Cleaned up ${cleanedCount} old jobs`,
    });
  } catch (error) {
    console.error('Error cleaning up jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error cleaning up jobs',
      error: error.message,
    });
  }
});

/**
 * @route POST /api/ocr/initialize-queue
 * @desc Initialize job queue service
 * @access Private (Admin)
 */
router.post('/initialize-queue', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    console.log('[OCR API] Initializing job queue...');

    await jobQueueService.initialize();

    const status = jobQueueService.getStatus();

    res.json({
      success: true,
      message: 'Job queue initialized successfully',
      data: status,
    });
  } catch (error) {
    console.error('Error initializing job queue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize job queue',
      error: error.message,
    });
  }
});

/**
 * @route POST /api/ocr/terminate-queue
 * @desc Terminate job queue service
 * @access Private (Admin)
 */
router.post('/terminate-queue', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    console.log('[OCR API] Terminating job queue...');

    await jobQueueService.terminate();

    res.json({
      success: true,
      message: 'Job queue terminated successfully',
    });
  } catch (error) {
    console.error('Error terminating job queue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to terminate job queue',
      error: error.message,
    });
  }
});

/**
 * @route GET /api/ocr/admin-stats
 * @desc Get admin statistics for OCR processing
 * @access Private (Admin)
 */
router.get('/admin-stats', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const { count: totalJobs } = await OCRResult.findAndCountAll();
    const { count: completedJobs } = await OCRResult.findAndCountAll({
      where: { status: 'completed' },
    });
    const { count: failedJobs } = await OCRResult.findAndCountAll({
      where: { status: 'failed' },
    });

    const queueStats = await jobQueueService.getQueueStats();

    res.json({
      success: true,
      data: {
        ocrResults: {
          total: totalJobs,
          completed: completedJobs,
          failed: failedJobs,
          successRate: totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0,
        },
        queue: queueStats,
      },
    });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving admin statistics',
      error: error.message,
    });
  }
});

module.exports = router;

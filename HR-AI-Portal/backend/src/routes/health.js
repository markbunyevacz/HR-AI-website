const express = require('express');
const router = express.Router();
const os = require('os');
const { sequelize } = require('../models');

/**
 * Health Check Routes
 * Provides system health monitoring and diagnostics
 */

// In-memory stats tracking
let startTime = new Date();
let requestCount = 0;

/**
 * @route GET /health
 * @desc Basic health check endpoint
 * @access Public
 */
router.get('/health', async (req, res) => {
  try {
    requestCount++;

    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    // Check database connection
    let databaseStatus = 'disconnected';
    try {
      await sequelize.authenticate();
      databaseStatus = 'connected';
    } catch (error) {
      databaseStatus = 'error';
    }

    const healthData = {
      status: databaseStatus === 'connected' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: formatUptime(uptime),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      database: databaseStatus,
      memory: {
        rss: formatBytes(memoryUsage.rss),
        heapTotal: formatBytes(memoryUsage.heapTotal),
        heapUsed: formatBytes(memoryUsage.heapUsed),
        external: formatBytes(memoryUsage.external),
      },
      system: {
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        loadavg: os.loadavg(),
        freemem: formatBytes(os.freemem()),
        totalmem: formatBytes(os.totalmem()),
      },
      requests: {
        total: requestCount,
        averagePerHour: Math.round((requestCount / (uptime / 3600)) * 100) / 100,
      },
    };

    const statusCode = healthData.status === 'healthy' ? 200 : 503;

    res.status(statusCode).json(healthData);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});

/**
 * @route GET /metrics
 * @desc Detailed metrics endpoint
 * @access Private (Admin)
 */
router.get('/metrics', async (req, res) => {
  try {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    const metrics = {
      // Application metrics
      application: {
        uptime: uptime,
        memoryUsage: memoryUsage,
        cpuUsage: process.cpuUsage(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
      },

      // Database metrics (if available)
      database: {
        status: 'unknown',
        connections: 0,
        queries: 0,
      },

      // OCR metrics (if OCR is enabled)
      ocr: {
        status: 'unknown',
        jobsProcessed: 0,
        averageProcessingTime: 0,
      },

      // System metrics
      system: {
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        loadavg: os.loadavg(),
        memory: {
          total: os.totalmem(),
          free: os.freemem(),
          used: os.totalmem() - os.freemem(),
        },
        uptime: os.uptime(),
      },

      // Request metrics
      requests: {
        total: requestCount,
        perSecond: requestCount / uptime,
        perMinute: (requestCount / uptime) * 60,
        perHour: (requestCount / uptime) * 3600,
      },

      // Timestamp
      timestamp: new Date().toISOString(),
    };

    res.json(metrics);
  } catch (error) {
    console.error('Metrics error:', error);
    res.status(500).json({
      error: 'Failed to retrieve metrics',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * @route POST /health/ready
 * @desc Kubernetes readiness probe
 * @access Public
 */
router.post('/ready', async (req, res) => {
  try {
    // Check if database is ready
    await sequelize.authenticate();

    res.status(200).json({
      status: 'ready',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * @route POST /health/live
 * @desc Kubernetes liveness probe
 * @access Public
 */
router.post('/live', (req, res) => {
  // Simple liveness check - if the process is running, we're alive
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * Utility Functions
 */

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

module.exports = router;

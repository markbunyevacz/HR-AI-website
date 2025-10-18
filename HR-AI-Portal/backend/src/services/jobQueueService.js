const Queue = require('bull');
const ocrService = require('./ocrService');
const ocrDataService = require('./ocrDataService');

/**
 * Job Queue Service for Async OCR Processing
 * Uses Bull/BullMQ for reliable job processing
 */

class JobQueueService {
  constructor() {
    this.ocrQueue = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the job queue
   * @param {object} redisConfig - Redis configuration
   */
  async initialize(redisConfig = {}) {
    try {
      if (!this.isInitialized) {
        // Initialize Redis-backed job queue
        this.ocrQueue = new Queue('OCR Processing', {
          redis: {
            host: redisConfig.host || process.env.REDIS_HOST || 'localhost',
            port: redisConfig.port || process.env.REDIS_PORT || 6379,
            password: redisConfig.password || process.env.REDIS_PASSWORD,
            db: redisConfig.db || 0,
          },
          defaultJobOptions: {
            removeOnComplete: 50, // Keep last 50 completed jobs
            removeOnFail: 20,     // Keep last 20 failed jobs
            attempts: 3,          // Retry failed jobs 3 times
            backoff: {
              type: 'exponential',
              delay: 2000,        // Start with 2 second delay
            },
          },
        });

        // Process OCR jobs
        this.ocrQueue.process('ocr-process', 2, async (job) => {
          const { filePath, userId, options } = job.data;

          console.log(`[Job Queue] Processing OCR job ${job.id} for user ${userId}`);

          try {
            let result;

            // Determine file type and process accordingly
            const ext = require('path').extname(filePath).toLowerCase();

            if (ext === '.pdf') {
              result = await ocrService.extractFromPdf(filePath, options);
            } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
              result = await ocrService.extractFromImage(filePath, options);
            } else {
              throw new Error(`Unsupported file type: ${ext}`);
            }

            // Store result in database
            await ocrDataService.parseAndStoreOCRResult(job.id, result);

            // Clean up uploaded file after processing
            const fs = require('fs');
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }

            return {
              success: true,
              result,
              processedAt: new Date(),
            };
          } catch (error) {
            console.error(`[Job Queue] OCR job ${job.id} failed:`, error);

            // Store error in database
            await ocrDataService.parseAndStoreOCRResult(job.id, {
              success: false,
              error: error.message
            });

            // Clean up file on error too
            const fs = require('fs');
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }

            throw error;
          }
        });

        // Handle job events
        this.ocrQueue.on('completed', (job, result) => {
          console.log(`[Job Queue] Job ${job.id} completed successfully`);
        });

        this.ocrQueue.on('failed', (job, err) => {
          console.error(`[Job Queue] Job ${job.id} failed:`, err.message);
        });

        this.ocrQueue.on('stalled', (job) => {
          console.warn(`[Job Queue] Job ${job.id} stalled`);
        });

        this.isInitialized = true;
        console.log('✅ Job Queue Service initialized successfully');
      }
    } catch (error) {
      console.error('❌ Error initializing Job Queue Service:', error);
      throw new Error('Failed to initialize job queue service');
    }
  }

  /**
   * Add OCR job to queue
   * @param {string} filePath - Path to uploaded file
   * @param {string} userId - User who uploaded the file
   * @param {object} options - OCR processing options
   * @returns {Promise<string>} - Job ID
   */
  async addOCRJob(filePath, userId, options = {}) {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const job = await this.ocrQueue.add('ocr-process', {
        filePath,
        userId,
        options,
        timestamp: new Date(),
      });

      console.log(`[Job Queue] Added OCR job ${job.id} for file: ${filePath}`);
      return job.id;
    } catch (error) {
      console.error('❌ Error adding OCR job to queue:', error);
      throw new Error('Failed to add OCR job to queue');
    }
  }

  /**
   * Get job status
   * @param {string} jobId - Job ID
   * @returns {Promise<object>} - Job status and progress
   */
  async getJobStatus(jobId) {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const job = await this.ocrQueue.getJob(jobId);

      if (!job) {
        return {
          status: 'not_found',
          message: 'Job not found',
        };
      }

      return {
        id: job.id,
        status: await job.getState(),
        progress: job.progress || 0,
        result: job.returnvalue,
        error: job.failedReason,
        createdAt: job.timestamp,
        processedAt: job.processedOn,
        finishedAt: job.finishedOn,
      };
    } catch (error) {
      console.error('❌ Error getting job status:', error);
      throw new Error('Failed to get job status');
    }
  }

  /**
   * Get all jobs for a user
   * @param {string} userId - User ID
   * @returns {Promise<array>} - Array of user jobs
   */
  async getUserJobs(userId) {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const jobs = await this.ocrQueue.getJobs(['active', 'waiting', 'completed', 'failed'], 0, 100);

      // Filter jobs by user ID
      const userJobs = jobs.filter(job => {
        return job.data && job.data.userId === userId;
      });

      return Promise.all(
        userJobs.map(async (job) => ({
          id: job.id,
          status: await job.getState(),
          progress: job.progress || 0,
          createdAt: job.timestamp,
          processedAt: job.processedOn,
          finishedAt: job.finishedOn,
          error: job.failedReason,
        }))
      );
    } catch (error) {
      console.error('❌ Error getting user jobs:', error);
      throw new Error('Failed to get user jobs');
    }
  }

  /**
   * Cancel a job
   * @param {string} jobId - Job ID
   * @returns {Promise<boolean>} - Success status
   */
  async cancelJob(jobId) {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const job = await this.ocrQueue.getJob(jobId);

      if (!job) {
        return false;
      }

      await job.remove();
      console.log(`[Job Queue] Cancelled job ${jobId}`);
      return true;
    } catch (error) {
      console.error('❌ Error cancelling job:', error);
      throw new Error('Failed to cancel job');
    }
  }

  /**
   * Get queue statistics
   * @returns {Promise<object>} - Queue stats
   */
  async getQueueStats() {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const [waiting, active, completed, failed, delayed] = await Promise.all([
        this.ocrQueue.getWaiting(),
        this.ocrQueue.getActive(),
        this.ocrQueue.getCompleted(),
        this.ocrQueue.getFailed(),
        this.ocrQueue.getDelayed(),
      ]);

      return {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
        delayed: delayed.length,
        total: waiting.length + active.length + completed.length + failed.length + delayed.length,
      };
    } catch (error) {
      console.error('❌ Error getting queue stats:', error);
      throw new Error('Failed to get queue statistics');
    }
  }

  /**
   * Clean up old completed jobs
   * @param {number} maxAge - Max age in milliseconds (default: 7 days)
   */
  async cleanupJobs(maxAge = 7 * 24 * 60 * 60 * 1000) {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const cutoffDate = Date.now() - maxAge;

      // Clean up old completed and failed jobs
      const completedJobs = await this.ocrQueue.getCompleted();
      const failedJobs = await this.ocrQueue.getFailed();

      let cleanedCount = 0;

      for (const job of [...completedJobs, ...failedJobs]) {
        if (job.finishedOn && job.finishedOn < cutoffDate) {
          await job.remove();
          cleanedCount++;
        }
      }

      console.log(`[Job Queue] Cleaned up ${cleanedCount} old jobs`);
      return cleanedCount;
    } catch (error) {
      console.error('❌ Error cleaning up jobs:', error);
      throw new Error('Failed to cleanup jobs');
    }
  }

  /**
   * Terminate the job queue
   */
  async terminate() {
    try {
      if (this.ocrQueue) {
        await this.ocrQueue.close();
        this.isInitialized = false;
        console.log('✅ Job Queue Service terminated');
      }
    } catch (error) {
      console.error('Error terminating Job Queue Service:', error);
    }
  }

  /**
   * Health check
   * @returns {object} - Health status
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      queueActive: this.ocrQueue !== null,
      timestamp: new Date(),
    };
  }
}

module.exports = new JobQueueService();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compressionMiddleware = require('./middleware/compression');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/password');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');
const blogRoutes = require('./routes/blog');
const chatRoutes = require('./routes/chat');
const certificateRoutes = require('./routes/certificates');
const ocrRoutes = require('./routes/ocr');
const healthRoutes = require('./routes/health');

const app = express();

// Trust proxy - required for Render.com and other reverse proxies
app.set('trust proxy', true);

// Compression Middleware (70-80% size reduction)
app.use(compressionMiddleware);

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many login attempts, please try again later',
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests, please try again later',
});

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'HR AI Portal API is running...', version: '1.0.0' });
});

// Apply API rate limiter to all API routes
app.use('/api/', apiLimiter);

// Auth routes with stricter rate limiting
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/password', authLimiter, passwordRoutes);

// Health check routes (no auth required)
app.use('/', healthRoutes);

// Protected routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/ocr', ocrRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = app;

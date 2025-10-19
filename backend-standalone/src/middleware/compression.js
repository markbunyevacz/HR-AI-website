/**
 * Compression Middleware
 * Reduces response size by 70-80% for JSON and text responses
 * 
 * Benefits:
 * - Faster page loads
 * - Reduced bandwidth costs
 * - Better user experience on slow connections
 */

const compression = require('compression');

// Configure compression with optimal settings for 100 users
const compressionMiddleware = compression({
  // Compression level (1-9, where 6 is optimal balance)
  level: 6,
  
  // Only compress responses above 1KB
  threshold: 1024,
  
  // Compress all text-based content
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    
    // Use compression's default filter
    return compression.filter(req, res);
  },
  
  // Memory level (1-9, where 8 is optimal)
  memLevel: 8,
  
  // Compression strategy (Z_DEFAULT_STRATEGY)
  strategy: 0
});

module.exports = compressionMiddleware;


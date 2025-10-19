/**
 * Simple In-Memory Cache Middleware
 * Caches GET requests to reduce database load
 * 
 * For 100 users, in-memory cache is sufficient and free
 * For 500+ users, migrate to Redis caching
 */

class SimpleCache {
  constructor() {
    this.cache = new Map();
    this.stats = {
      hits: 0,
      misses: 0
    };
  }

  get(key) {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }
    
    // Check if expired
    if (entry.expires < Date.now()) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }
    
    this.stats.hits++;
    return entry.data;
  }

  set(key, data, duration = 300) {
    this.cache.set(key, {
      data,
      expires: Date.now() + duration * 1000
    });
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  getStats() {
    const total = this.stats.hits + this.stats.misses;
    const hitRate = total > 0 ? (this.stats.hits / total * 100).toFixed(2) : 0;
    
    return {
      ...this.stats,
      total,
      hitRate: `${hitRate}%`,
      size: this.cache.size
    };
  }
}

const cache = new SimpleCache();

/**
 * Cache middleware factory
 * @param {number} duration - Cache duration in seconds (default: 5 minutes)
 * @param {function} keyGenerator - Custom cache key generator
 */
function cacheMiddleware(duration = 300, keyGenerator = null) {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Don't cache if user is authenticated (personalized content)
    // Comment out this block if you want to cache authenticated requests
    // if (req.user) {
    //   return next();
    // }
    
    // Generate cache key
    const key = keyGenerator 
      ? keyGenerator(req) 
      : `${req.originalUrl}_${req.user?.id || 'guest'}`;
    
    // Check cache
    const cached = cache.get(key);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }
    
    // Cache miss - intercept json() method
    res.setHeader('X-Cache', 'MISS');
    const originalJson = res.json.bind(res);
    
    res.json = (data) => {
      // Only cache successful responses
      if (res.statusCode === 200) {
        cache.set(key, data, duration);
      }
      return originalJson(data);
    };
    
    next();
  };
}

/**
 * Clear cache by pattern
 * @param {string} pattern - Cache key pattern (e.g., '/api/courses')
 */
function clearCache(pattern = null) {
  if (!pattern) {
    cache.clear();
    return;
  }
  
  // Clear specific keys matching pattern
  for (const key of cache.cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}

/**
 * Cache stats endpoint middleware
 */
function cacheStatsMiddleware(req, res) {
  res.json({
    cache: cache.getStats(),
    message: 'Cache statistics'
  });
}

module.exports = {
  cacheMiddleware,
  clearCache,
  cacheStatsMiddleware,
  cache
};


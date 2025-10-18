# Deployment Environment Configuration

## 🔧 Environment Variables Setup

Create a `.env` file in the root directory with the following configuration:

```env
# =============================================
# CORE APPLICATION SETTINGS
# =============================================

# Application Environment (development, production, test)
NODE_ENV=production

# Server Configuration
PORT=3001
HOST=0.0.0.0

# API Base URL (for frontend)
API_URL=https://your-api-domain.com

# =============================================
# DATABASE CONFIGURATION
# =============================================

# PostgreSQL Database Connection
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=hr_ai_portal
DB_USERNAME=your_db_user
DB_PASSWORD=your_secure_db_password

# Database Connection Pool Settings
DB_POOL_MAX=20
DB_POOL_MIN=5
DB_POOL_ACQUIRE_TIMEOUT=30000
DB_POOL_IDLE_TIMEOUT=10000

# =============================================
# JWT AUTHENTICATION
# =============================================

# JWT Secret Key (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-for-security

# JWT Token Expiration
JWT_EXPIRES_IN=1d

# Refresh Token Expiration
JWT_REFRESH_EXPIRES_IN=7d

# =============================================
# SECURITY & CORS
# =============================================

# Allowed Origins (comma-separated for multiple domains)
ALLOWED_ORIGINS=https://yourdomain.com,https://app.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Auth Rate Limiting (stricter)
AUTH_RATE_LIMIT_WINDOW_MS=900000
AUTH_RATE_LIMIT_MAX_REQUESTS=5

# File Upload Limits
MAX_FILE_SIZE=52428800

# =============================================
# EMAIL CONFIGURATION
# =============================================

# Email Service (gmail, outlook, etc.)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here

# Email From Address
EMAIL_FROM=noreply@yourdomain.com

# Email Templates
EMAIL_VERIFY_SUBJECT=Verify Your Account
EMAIL_RESET_SUBJECT=Password Reset Request

# =============================================
# OCR SERVICE CONFIGURATION
# =============================================

# Enable OCR Service
OCR_ENABLED=true

# OCR Language (default: English)
OCR_LANG=eng

# OCR Cache Type (disk, memory)
OCR_CACHE_TYPE=disk

# Maximum File Size for OCR Processing
OCR_MAX_FILE_SIZE=52428800

# Maximum Batch Size for OCR
OCR_BATCH_MAX_FILES=10

# Enable Image Preprocessing
OCR_PREPROCESSING=true

# OCR Worker Timeout (milliseconds)
OCR_TIMEOUT=300000

# =============================================
# REDIS CONFIGURATION (for job queues)
# =============================================

# Redis Host
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
REDIS_DB=0

# Job Queue Settings
QUEUE_MAX_JOBS=10
QUEUE_RETRY_ATTEMPTS=3
QUEUE_RETRY_DELAY=2000

# =============================================
# FILE UPLOAD CONFIGURATION
# =============================================

# Upload Directories
UPLOAD_DIR=./uploads
OCR_UPLOAD_DIR=./uploads/ocr
CERTIFICATE_DIR=./uploads/certificates

# Maximum Upload Size
MAX_UPLOAD_SIZE=52428800

# Allowed File Types (comma-separated)
ALLOWED_FILE_TYPES=application/pdf,image/jpeg,image/png,image/gif,image/webp

# =============================================
# FRONTEND CONFIGURATION
# =============================================

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Build Configuration
VITE_API_URL=https://your-api-domain.com

# =============================================
# LOGGING & MONITORING
# =============================================

# Log Level (error, warn, info, debug)
LOG_LEVEL=info

# Enable Request Logging
LOG_REQUESTS=true

# Enable Error Logging
LOG_ERRORS=true

# Log File Path (optional)
LOG_FILE=./logs/app.log

# =============================================
# PERFORMANCE & CACHING
# =============================================

# Enable Caching
CACHE_ENABLED=true

# Cache TTL (seconds)
CACHE_TTL=3600

# Redis Cache TTL (seconds)
REDIS_CACHE_TTL=3600

# =============================================
# ADMIN & MAINTENANCE
# =============================================

# Admin Email (for system notifications)
ADMIN_EMAIL=admin@yourdomain.com

# Enable Maintenance Mode
MAINTENANCE_MODE=false

# Maintenance Message
MAINTENANCE_MESSAGE=System is under maintenance. Please try again later.

# =============================================
# THIRD-PARTY INTEGRATIONS
# =============================================

# Google Analytics (optional)
GA_TRACKING_ID=

# Sentry DSN (optional)
SENTRY_DSN=

# Stripe Keys (optional - for payments)
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# =============================================
# DEVELOPMENT SETTINGS
# =============================================

# Enable Debug Mode
DEBUG=false

# Enable SQL Query Logging
LOG_SQL_QUERIES=false

# Enable API Response Logging
LOG_API_RESPONSES=false

# =============================================
# PRODUCTION OVERRIDES
# =============================================

# Production Database URL (overrides individual DB settings)
# DATABASE_URL=postgresql://username:password@host:port/database

# Production Redis URL (overrides individual Redis settings)
# REDIS_URL=redis://:password@host:port/db

# Production Email URL (for services like SendGrid, Mailgun)
# EMAIL_URL=smtp://username:password@smtp.example.com:587

# =============================================
# SSL/TLS CONFIGURATION (Production)
# =============================================

# SSL Certificate Path
SSL_CERT_PATH=
SSL_KEY_PATH=

# Force HTTPS in Production
FORCE_HTTPS=false

# HSTS Max Age (seconds)
HSTS_MAX_AGE=31536000

# =============================================
# BACKUP & MONITORING
# =============================================

# Database Backup Schedule (cron format)
DB_BACKUP_SCHEDULE=0 2 * * *

# Backup Retention (days)
BACKUP_RETENTION_DAYS=30

# Health Check Endpoint
HEALTH_CHECK_PATH=/health

# Metrics Endpoint
METRICS_PATH=/metrics

# =============================================
# SECURITY HEADERS
# =============================================

# Content Security Policy
CSP_DEFAULT_SRC="'self'"
CSP_SCRIPT_SRC="'self' 'unsafe-inline'"
CSP_STYLE_SRC="'self' 'unsafe-inline'"
CSP_IMG_SRC="'self' data: https:"
CSP_FONT_SRC="'self'"

# Security Headers
X_CONTENT_TYPE_OPTIONS=nosniff
X_FRAME_OPTIONS=DENY
X_XSS_PROTECTION="1; mode=block"
STRICT_TRANSPORT_SECURITY=max-age=31536000; includeSubDomains

# =============================================
# PERFORMANCE OPTIMIZATION
# =============================================

# Enable Compression
COMPRESSION_ENABLED=true

# Compression Level (1-9)
COMPRESSION_LEVEL=6

# Enable Response Caching
RESPONSE_CACHE_ENABLED=true

# Cache Control Headers
CACHE_CONTROL_MAX_AGE=3600

# =============================================
# RATE LIMITING (Advanced)
# =============================================

# Global Rate Limit
GLOBAL_RATE_LIMIT_WINDOW_MS=60000
GLOBAL_RATE_LIMIT_MAX_REQUESTS=1000

# API Rate Limit
API_RATE_LIMIT_WINDOW_MS=60000
API_RATE_LIMIT_MAX_REQUESTS=100

# Upload Rate Limit
UPLOAD_RATE_LIMIT_WINDOW_MS=300000
UPLOAD_RATE_LIMIT_MAX_REQUESTS=10

# =============================================
# FEATURE FLAGS
# =============================================

# Enable Blog Feature
FEATURE_BLOG=true

# Enable Chat Feature
FEATURE_CHAT=true

# Enable OCR Feature
FEATURE_OCR=true

# Enable Certificates
FEATURE_CERTIFICATES=true

# Enable Admin Panel
FEATURE_ADMIN=true

# Enable User Dashboard
FEATURE_DASHBOARD=true

# =============================================
# ANALYTICS & TRACKING
# =============================================

# Enable Google Analytics
ANALYTICS_ENABLED=false

# Analytics Tracking ID
ANALYTICS_ID=

# Enable Error Tracking
ERROR_TRACKING_ENABLED=false

# Error Tracking DSN
ERROR_TRACKING_DSN=

# =============================================
# API DOCUMENTATION
# =============================================

# Enable Swagger/OpenAPI
API_DOCS_ENABLED=true

# API Docs Path
API_DOCS_PATH=/api-docs

# API Version
API_VERSION=1.0.0

# =============================================
# WEBHOOKS & INTEGRATIONS
# =============================================

# Slack Webhook URL (for notifications)
SLACK_WEBHOOK_URL=

# Discord Webhook URL (for notifications)
DISCORD_WEBHOOK_URL=

# Teams Webhook URL (for notifications)
TEAMS_WEBHOOK_URL=

# =============================================
# COMPLIANCE & LEGAL
# =============================================

# GDPR Compliance
GDPR_COMPLIANT=true

# Data Retention Period (days)
DATA_RETENTION_DAYS=2555

# Cookie Consent Required
COOKIE_CONSENT_REQUIRED=true

# Terms of Service URL
TERMS_URL=https://yourdomain.com/terms

# Privacy Policy URL
PRIVACY_URL=https://yourdomain.com/privacy

# =============================================
# CUSTOMIZATION
# =============================================

# Site Name
SITE_NAME=HR AI Certification Portal

# Site Description
SITE_DESCRIPTION=Professional HR certification and training platform

# Site Keywords (comma-separated)
SITE_KEYWORDS=HR, certification, training, human resources, AI

# Default Language
DEFAULT_LANGUAGE=en

# Timezone
TIMEZONE=UTC

# =============================================
# DEPLOYMENT ENVIRONMENT
# =============================================

# Deployment Platform (heroku, digitalocean, aws, gcp, azure)
DEPLOYMENT_PLATFORM=local

# Deployment Region
DEPLOYMENT_REGION=us-east-1

# Instance Size
INSTANCE_SIZE=t3.medium

# Auto Scaling Enabled
AUTO_SCALING_ENABLED=false

# Load Balancer Enabled
LOAD_BALANCER_ENABLED=false

# CDN Enabled
CDN_ENABLED=false

# =============================================
# DEVELOPMENT TOOLS
# =============================================

# Enable Hot Reload
HOT_RELOAD=true

# Enable Source Maps
SOURCE_MAPS=true

# Enable ESLint
ESLINT_ENABLED=true

# Enable Prettier
PRETTIER_ENABLED=true

# =============================================
# TESTING CONFIGURATION
# =============================================

# Test Database URL
TEST_DB_URL=

# Test Redis URL
TEST_REDIS_URL=

# Enable Test Coverage
COVERAGE_ENABLED=true

# Coverage Threshold
COVERAGE_THRESHOLD=75

# =============================================
# BACKUP CONFIGURATION
# =============================================

# Backup Storage Provider (local, s3, gcs)
BACKUP_PROVIDER=local

# Backup Storage Path
BACKUP_PATH=./backups

# AWS S3 Backup Settings (if using S3)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=

# Google Cloud Storage Settings (if using GCS)
GCS_PROJECT_ID=
GCS_KEY_FILE=
GCS_BUCKET=

# =============================================
# MONITORING & ALERTS
# =============================================

# Enable Monitoring
MONITORING_ENABLED=true

# Monitoring Service (prometheus, datadog, newrelic)
MONITORING_SERVICE=prometheus

# Alert Email Recipients (comma-separated)
ALERT_EMAILS=admin@yourdomain.com

# Slack Alert Channel
SLACK_ALERT_CHANNEL=

# Alert Thresholds
CPU_ALERT_THRESHOLD=80
MEMORY_ALERT_THRESHOLD=85
DISK_ALERT_THRESHOLD=90

# =============================================
# PERFORMANCE SETTINGS
# =============================================

# Node.js Memory Limit
NODE_MEMORY_LIMIT=4096

# Worker Threads (for OCR processing)
WORKER_THREADS=2

# OCR Processing Concurrency
OCR_CONCURRENCY=2

# Database Query Timeout
DB_QUERY_TIMEOUT=30000

# API Response Timeout
API_RESPONSE_TIMEOUT=30000

# =============================================
# MISCELLANEOUS
# =============================================

# Enable API Versioning
API_VERSIONING=true

# Enable Request ID Tracking
REQUEST_ID_TRACKING=true

# Enable Response Time Tracking
RESPONSE_TIME_TRACKING=true

# Enable Database Connection Pooling
DB_CONNECTION_POOLING=true

# Enable Redis Connection Pooling
REDIS_CONNECTION_POOLING=true

# =============================================
# PRODUCTION CHECKLIST
# =============================================

# Before deploying to production, ensure:
# 1. All secrets are properly configured
# 2. Database is backed up
# 3. SSL certificates are valid
# 4. Environment variables are set
# 5. Monitoring is configured
# 6. Backups are scheduled
# 7. Security headers are enabled
# 8. Rate limiting is appropriate
# 9. OCR dependencies are installed
# 10. Testing suite is passing
```

## 🚀 Deployment Scripts

### Production Deployment Script

```bash
#!/bin/bash

# HR AI Portal - Production Deployment Script
# Run this script to deploy to production

echo "🚀 Starting HR AI Portal Production Deployment..."

# 1. Install Dependencies
echo "📦 Installing dependencies..."
npm install --production

# 2. Install OCR Dependencies
echo "🔍 Installing OCR dependencies..."
npm install tesseract.js pdf-parse multer sharp bull

# 3. Run Database Migrations
echo "🗄️ Running database migrations..."
npm run db:migrate

# 4. Build Frontend
echo "⚛️ Building frontend..."
cd frontend
npm install
npm run build
cd ..

# 5. Copy Environment File
echo "⚙️ Configuring environment..."
cp .env.production .env

# 6. Set Production Environment
export NODE_ENV=production

# 7. Start Application
echo "🚀 Starting application..."
npm start

echo "✅ Deployment completed successfully!"
echo "🌐 Application running on port 3001"
echo "🔗 Frontend available at: https://yourdomain.com"
```

### Docker Deployment

```dockerfile
# HR AI Portal - Production Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for OCR
RUN apk add --no-cache \
    tesseract-ocr \
    tesseract-ocr-data-eng \
    poppler-utils \
    imagemagick

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads/ocr uploads/certificates

# Set permissions
RUN chmod -R 755 uploads

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start application
CMD ["npm", "start"]
```

### Docker Compose (with PostgreSQL and Redis)

```yaml
version: '3.8'

services:
  # Main Application
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PORT=5432
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - db
      - redis
    volumes:
      - uploads:/app/uploads
      - ./logs:/app/logs
    restart: unless-stopped

  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=hr_ai_portal
      - POSTGRES_USER=your_db_user
      - POSTGRES_PASSWORD=your_db_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  # Redis for Job Queue
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - uploads:/app/uploads
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  uploads:
```

### Nginx Configuration

```nginx
# HR AI Portal - Nginx Configuration
upstream hr_ai_portal {
    server app:3001;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # API Routes
    location /api/ {
        proxy_pass http://hr_ai_portal;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # CORS Headers
        add_header 'Access-Control-Allow-Origin' 'https://yourdomain.com' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;

        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }

    # Frontend Routes
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Health Check
    location /health {
        proxy_pass http://hr_ai_portal/health;
        access_log off;
    }

    # Metrics
    location /metrics {
        proxy_pass http://hr_ai_portal/metrics;
        access_log off;
    }
}
```

## 📦 OCR Library Installation

### Ubuntu/Debian (Production Server)

```bash
# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install OCR dependencies
sudo apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    poppler-utils \
    imagemagick \
    libopencv-dev \
    python3-opencv

# Install Node.js dependencies
npm install tesseract.js pdf-parse multer sharp bull

# Verify OCR installation
tesseract --version
```

### Docker (Recommended for Production)

```dockerfile
# Multi-stage build for OCR support
FROM node:18-alpine as builder

# Install system dependencies for OCR
RUN apk add --no-cache \
    tesseract-ocr \
    tesseract-ocr-data-eng \
    poppler-utils \
    imagemagick

# Install Node.js dependencies
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine as production

# Install runtime OCR dependencies
RUN apk add --no-cache \
    tesseract-ocr \
    tesseract-ocr-data-eng \
    poppler-utils

# Copy application
COPY --from=builder /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY . .

# Create necessary directories
RUN mkdir -p uploads/ocr uploads/certificates logs

# Set permissions
RUN chmod -R 755 uploads logs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

EXPOSE 3001
CMD ["npm", "start"]
```

## 🔧 Production Configuration

### PM2 Process Manager

```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start ecosystem.config.js

# Monitor application
pm2 monit

# Logs
pm2 logs

# Restart on file changes (development)
pm2 start src/index.js --watch
```

### PM2 Ecosystem File

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'hr-ai-portal',
    script: 'src/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    merge_logs: true,
    max_memory_restart: '1G',
    restart_delay: 4000,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
```

## 🗄️ Database Setup

### PostgreSQL Production Configuration

```sql
-- Production PostgreSQL Configuration
-- Run these commands on your production database

-- Create database
CREATE DATABASE hr_ai_portal;

-- Create user
CREATE USER hr_ai_user WITH PASSWORD 'your_secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE hr_ai_portal TO hr_ai_user;

-- Connect to database and run migrations
\c hr_ai_portal;
\i database/migrations/001-create-user.js
\i database/migrations/002-create-courses.js
\i database/migrations/003-create-lessons.js
\i database/migrations/004-create-quizzes.js
\i database/migrations/005-create-user-course-progress.js
\i database/migrations/006-create-user-lesson-progress.js
\i database/migrations/007-create-user-quiz-attempts.js
\i database/migrations/008-create-ocr-results.js
\i database/migrations/009-add-performance-indexes.js
```

## 🔐 SSL Certificate Setup

### Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt-get install certbot

# Generate SSL certificate
sudo certbot certonly --standalone \
  --agree-tos \
  --register-unsafely-without-email \
  -d yourdomain.com \
  -d www.yourdomain.com

# Certificate paths:
/etc/letsencrypt/live/yourdomain.com/fullchain.pem
/etc/letsencrypt/live/yourdomain.com/privkey.pem

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Manual SSL Certificate

```bash
# Generate self-signed certificate (development only)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Certificate paths:
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem
```

## 📊 Monitoring Setup

### Application Monitoring

```bash
# Install monitoring tools
npm install pm2

# Start with monitoring
pm2 start ecosystem.config.js
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 10

# Monitor application
pm2 monit
```

### Health Check Endpoint

The application includes a health check endpoint at `/health`:

```bash
curl https://yourdomain.com/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-10-18T10:30:00Z",
  "uptime": "2h 15m",
  "database": "connected",
  "redis": "connected",
  "ocr": "ready"
}
```

## 🚀 Deployment Commands

### Local Development
```bash
# Install dependencies
npm install

# Start database
npm run db:start  # If using Docker

# Run migrations
npm run db:migrate

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Production Deployment
```bash
# 1. Update code
git pull origin main

# 2. Install dependencies
npm ci --production

# 3. Install OCR dependencies
npm install tesseract.js pdf-parse multer sharp bull

# 4. Run database migrations
npm run db:migrate

# 5. Build frontend
cd frontend && npm ci && npm run build && cd ..

# 6. Start application
pm2 restart hr-ai-portal

# 7. Verify deployment
curl https://yourdomain.com/health
```

## ⚠️ Pre-Deployment Checklist

### Security
- [ ] All environment variables configured
- [ ] JWT secrets are strong (32+ characters)
- [ ] Database credentials are secure
- [ ] SSL certificates are valid
- [ ] Security headers enabled
- [ ] Rate limiting configured

### Performance
- [ ] Database indexes created
- [ ] Redis configured for caching
- [ ] OCR dependencies installed
- [ ] File upload limits set
- [ ] Monitoring enabled

### Functionality
- [ ] Database migrations run
- [ ] OCR service tested
- [ ] Email service configured
- [ ] Admin panel accessible
- [ ] All features working

### Monitoring
- [ ] Health check endpoint working
- [ ] Error logging configured
- [ ] Backup system set up
- [ ] Alerting configured

## 📋 Post-Deployment Steps

### 1. Verify Application
```bash
# Check health endpoint
curl https://yourdomain.com/health

# Test OCR functionality
curl -X POST https://yourdomain.com/api/ocr/initialize \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test database connectivity
curl https://yourdomain.com/api/courses
```

### 2. Set Up Monitoring
```bash
# Install monitoring dashboard
pm2 install pm2-web

# Access monitoring at:
# http://your-server:8080
```

### 3. Configure Backups
```bash
# Set up automated backups
crontab -e
# Add: 0 2 * * * /path/to/backup-script.sh
```

### 4. SSL Certificate Renewal
```bash
# For Let's Encrypt
sudo certbot renew --dry-run

# Set up auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Troubleshooting

### Common Issues

#### OCR Not Working
```bash
# Check OCR service status
curl -X GET https://yourdomain.com/api/ocr/status \
  -H "Authorization: Bearer YOUR_TOKEN"

# Initialize OCR service
curl -X POST https://yourdomain.com/api/ocr/initialize \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Database Connection Issues
```bash
# Check database connectivity
psql -h your-db-host -U your_db_user -d hr_ai_portal

# Test connection from application
curl https://yourdomain.com/health
```

#### Memory Issues
```bash
# Check memory usage
pm2 monit

# Increase memory limit if needed
pm2 restart hr-ai-portal --max-memory-restart 2G
```

#### SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in /etc/letsencrypt/live/yourdomain.com/cert.pem -text -noout

# Renew certificate
sudo certbot renew
```

## 📈 Performance Optimization

### Database Optimization
```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM courses WHERE isPublished = true;

-- Vacuum and analyze
VACUUM ANALYZE;

-- Check index usage
SELECT * FROM pg_stat_user_indexes WHERE idx_scan = 0;
```

### Application Optimization
```bash
# Enable clustering for better performance
pm2 start ecosystem.config.js

# Monitor performance
pm2 monit

# Check logs for slow queries
tail -f logs/combined.log | grep "slow"
```

## 🔒 Security Hardening

### Firewall Configuration
```bash
# Allow only necessary ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22  # SSH (restrict to your IP)
sudo ufw enable
```

### Fail2Ban Configuration
```bash
# Install fail2ban
sudo apt-get install fail2ban

# Configure for application
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
# Edit jail.local to include application logs
```

## 📊 Scaling Configuration

### Horizontal Scaling
```javascript
// ecosystem.config.js for multiple instances
module.exports = {
  apps: [{
    name: 'hr-ai-portal',
    script: 'src/index.js',
    instances: 4,  // Scale to 4 instances
    exec_mode: 'cluster',
    // ... other config
  }]
};
```

### Load Balancer Configuration
```nginx
# Nginx load balancer
upstream hr_ai_portal_backend {
    least_conn;
    server app1:3001;
    server app2:3001;
    server app3:3001;
    server app4:3001;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    location / {
        proxy_pass http://hr_ai_portal_backend;
        # ... proxy config
    }
}
```

## ✅ Deployment Complete

Your HR AI Certification Portal is now deployed and ready for production use!

**Access Points:**
- 🌐 **Frontend:** https://yourdomain.com
- 🔗 **API:** https://yourdomain.com/api/
- 🛠️ **Admin:** https://yourdomain.com/admin
- 📊 **Health:** https://yourdomain.com/health

**Next Steps:**
1. Monitor application performance
2. Set up regular backups
3. Configure SSL certificate renewal
4. Monitor security and update dependencies
5. Scale as user base grows

---

**🎉 Deployment Successful! Your HR AI Certification Portal is now live!** 🚀

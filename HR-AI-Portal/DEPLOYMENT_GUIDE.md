# Deployment Guide

## 🚀 Deployment Options

### Option 1: Docker Deployment (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Option 2: Manual Deployment

#### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- PM2 (for process management)

#### Steps

1. **Clone and Install**
```bash
git clone [repository-url]
cd HR-AI-Portal
npm install --production
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with production settings
```

3. **Database Setup**
```bash
cd backend
npm run migrate:prod
npm run seed:prod  # Optional: add demo data
```

4. **Build Frontend**
```bash
cd frontend
npm run build
```

5. **Start Services**
```bash
# Using PM2
pm2 start ecosystem.config.js

# Or manually
cd backend && NODE_ENV=production npm start
```

## 🔧 Environment Configuration

### Required Variables
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/hr_ai_portal
DB_SSL=true

# Authentication
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRY=7d

# Redis Cache
REDIS_URL=redis://localhost:6379

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Application
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-domain.com
```

### Optional Services
```env
# OCR Service
ENABLE_OCR=true
OCR_LANGUAGES=eng,hun

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info
```

## 🔒 Security Checklist

Before deployment:
- [ ] Change all default passwords
- [ ] Generate strong JWT_SECRET
- [ ] Enable SSL/TLS
- [ ] Configure firewall rules
- [ ] Set up backup strategy
- [ ] Enable monitoring
- [ ] Configure rate limiting
- [ ] Review CORS settings

## 🚦 Health Checks

Verify deployment:
```bash
# API health
curl https://your-domain.com/api/health

# Database connection
curl https://your-domain.com/api/health/db

# Redis connection
curl https://your-domain.com/api/health/redis
```

## 📊 Monitoring

Recommended monitoring setup:
- Application: PM2 Plus or New Relic
- Database: pgAdmin or Datadog
- Logs: ELK Stack or Papertrail
- Uptime: UptimeRobot or Pingdom

## 🔄 Updates and Maintenance

### Updating the Application
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Run migrations
cd backend && npm run migrate:prod

# Rebuild frontend
cd ../frontend && npm run build

# Restart services
pm2 restart all
```

### Backup Strategy
- Database: Daily automated backups
- Files: Weekly backup of uploads folder
- Configuration: Version control for env files

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify PostgreSQL is running
   - Check firewall rules

2. **Redis Connection Error**
   - Verify Redis is running
   - Check REDIS_URL
   - Test with redis-cli

3. **JWT Errors**
   - Ensure JWT_SECRET is set
   - Check token expiry settings
   - Verify CORS configuration

## 📞 Support

For deployment assistance, check:
- [Developer Guide](./DEVELOPER_GUIDE.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [Security Guide](./docs/SECURITY_VERIFICATION_CHECKLIST.md)

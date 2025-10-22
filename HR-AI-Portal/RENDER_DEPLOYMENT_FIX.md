# Render Deployment Fix - Community Site 404 Issues

## 🔴 Problem Summary

The community site (and other API endpoints) are returning **404 Not Found** errors on the Render-deployed version:
- `/api/chat/rooms` → 404
- `/api/chat/messages/general` → 404
- `/api/courses` → 404
- `/api/blog` → 404

## 🔍 Root Cause Analysis

### Issue 1: Backend Not Running
The Render backend service appears to be down or not properly initialized.

### Issue 2: Database Connection
The backend cannot establish a database connection to the Render PostgreSQL instance.

### Issue 3: Environment Variables
Missing or incorrectly configured environment variables in Render dashboard.

## ✅ Fix Instructions

### Step 1: Check Render Dashboard

1. **Login to Render Dashboard**: https://dashboard.render.com
2. **Navigate to Your Services**:
   - Find service: `hr-ai-backend`
   - Find service: `hr-ai-frontend`
   - Find database: `hr-ai-db`

3. **Check Backend Service Status**:
   - Click on `hr-ai-backend`
   - Check the current status in top-right corner
   - View deployment logs (should show "Server is running on port 3001")

### Step 2: Verify Environment Variables

On Render Dashboard for `hr-ai-backend`:

1. **Navigate to**: Environment
2. **Verify these variables exist**:
   - ✅ `NODE_ENV` = `production`
   - ✅ `DATABASE_URL` = (should be auto-populated from database)
   - ✅ `JWT_SECRET` = (set a strong random string, min 32 chars)
   - ✅ `ALLOWED_ORIGINS` = `https://hr-ai-frontend-36m6.onrender.com` (or your frontend URL)

3. **Check if missing**:
   - Add `JWT_SECRET` if not present
   - Add `ALLOWED_ORIGINS` if not present
   - Verify `DATABASE_URL` is properly linked to the PostgreSQL database

### Step 3: Check Database Connection

1. **Verify PostgreSQL is running**:
   - In Render Dashboard, click on `hr-ai-db`
   - Status should show "Available"
   - Connection info should display the database URL

2. **If database is down**:
   - Click "Restart Database" button
   - Wait 2-3 minutes for it to restart

### Step 4: Restart Backend Service

1. **In Render Dashboard**, click on `hr-ai-backend`
2. **Click "Manual Deploy" > "Latest Commit"**
3. **Wait for deployment to complete** (should see "Live" status)

### Step 5: Verify Deployment

1. **Test health endpoint**:
   ```
   curl https://hr-ai-frontend-36m6.onrender.com/api/health
   ```

2. **Expected response** (if working):
   ```json
   {
     "status": "healthy",
     "database": "connected",
     "timestamp": "2025-10-22T..."
   }
   ```

3. **If still 404**, check the following...

## 🔧 Advanced Troubleshooting

### Issue: Backend Logs Show Database Connection Error

**Error**: `connect ENOENT /var/run/postgresql/.s.PGSQL.5432`

**Solution**:
1. Verify `DATABASE_URL` environment variable is set
2. Click on the database in Render Dashboard
3. Copy the "Internal Database URL" 
4. Update `DATABASE_URL` in backend environment variables
5. Redeploy backend

### Issue: Port Already in Use

**Error**: `listen EADDRINUSE :::3001`

**Solution**:
1. Go to backend service on Render
2. Click "Manual Deploy" > "Latest Commit"
3. Select "Clear build cache and redeploy"

### Issue: Missing Dependencies

**Error**: `Cannot find module 'sequelize'`

**Solution**:
The issue is in `render.yaml` - it points to `backend-standalone` but uses wrong buildCommand.

**Fix**:
```yaml
# Current (WRONG):
rootDirectory: backend-standalone
buildCommand: npm install

# Should be:
rootDirectory: backend-standalone
buildCommand: npm install --production
```

But the deploy command runs `npm start` which uses `backend-standalone/src/index.js`

## 📝 Current render.yaml Configuration

```yaml
services:
  - type: web
    name: hr-ai-backend
    env: node
    plan: starter
    rootDirectory: backend-standalone
    buildCommand: npm install
    startCommand: npm start
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: hr-ai-db
          property: connectionString

databases:
  - name: hr-ai-db
    plan: starter
```

## 🚀 Complete Fix Checklist

- [ ] **Step 1**: Verify all services are "Available" in Render Dashboard
  - [ ] `hr-ai-backend` is running
  - [ ] `hr-ai-db` (PostgreSQL) is available
  - [ ] `hr-ai-frontend` is deployed

- [ ] **Step 2**: Environment variables are configured
  - [ ] `NODE_ENV` = `production`
  - [ ] `DATABASE_URL` is set (linked to database)
  - [ ] `JWT_SECRET` is set (32+ character random string)
  - [ ] `ALLOWED_ORIGINS` includes frontend URL

- [ ] **Step 3**: Database is initialized
  - [ ] Connect to Render dashboard PostgreSQL
  - [ ] Run database migrations
  - [ ] Seed initial data (if needed)

- [ ] **Step 4**: Backend is deployed
  - [ ] Manually trigger deploy from latest commit
  - [ ] Wait for "Live" status
  - [ ] Check build logs for errors

- [ ] **Step 5**: Test endpoints
  - [ ] Test `/health` endpoint
  - [ ] Test `/api/auth/login` endpoint
  - [ ] Test `/api/chat/rooms` endpoint
  - [ ] Test `/api/courses` endpoint

## 📊 Database Migration on Render

If database tables are missing, run migrations:

1. **Connect to Render PostgreSQL**:
   ```bash
   psql <DATABASE_URL_from_render>
   ```

2. **Check if tables exist**:
   ```sql
   \dt  -- List all tables
   ```

3. **If tables are missing**, use the Render Shell:
   - In Render Dashboard for `hr-ai-backend`
   - Click "Shell"
   - Run: `npm run db:migrate`

## 🆘 Emergency Recovery

If all else fails:

1. **Back up current database** (in Render Dashboard)
2. **Delete the service**: `hr-ai-backend`
3. **Delete the database**: `hr-ai-db` (⚠️ WARNING: Data will be lost!)
4. **Commit and push** your code to GitHub
5. **Render will auto-redeploy** from render.yaml
6. **Wait for new service to start**

## 📞 Support Resources

- **Render Documentation**: https://render.com/docs
- **Render Community**: https://render.com/community
- **Backend Health Endpoint**: `GET /health`
- **Backend Logs**: Available in Render Dashboard

## ✨ Quick Verification

Once deployment is fixed, you should be able to:

1. ✅ Access frontend: `https://hr-ai-frontend-36m6.onrender.com`
2. ✅ Login successfully
3. ✅ Navigate to Community page
4. ✅ See chat rooms loading
5. ✅ Send and receive messages
6. ✅ View courses
7. ✅ View blog posts

---

**Last Updated**: 2025-10-22
**Status**: Deployment Issue Identified
**Next Step**: Execute Fix Checklist Above

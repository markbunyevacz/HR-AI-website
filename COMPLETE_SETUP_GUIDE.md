# 🚀 COMPLETE SETUP GUIDE - ALL OPTIONS

**Created:** October 19, 2025 10:40 UTC  
**Status:** Step-by-step execution guide

---

## 📊 CURRENT STATUS

**Completed:** ✅
- Backend API deployed and running
- PostgreSQL database created and connected
- Health check: HEALTHY

**To Do:** ⏳
1. Deploy Frontend (React app)
2. Configure for API usage
3. Run database migrations

---

## 🎯 OPTION 1: DEPLOY FRONTEND

### **Frontend Deployment Steps:**

#### **Step 1: Create Static Site on Render**

1. **Go to Render Dashboard**
2. **Click "+ New"** (top right)
3. **Select "Static Site"**

#### **Step 2: Connect Repository**

```
Repository: markbunyevacz/HR-AI-website
Branch: main
```

#### **Step 3: Configure Build Settings**

**Copy these exact values:**

| Field | Value |
|-------|-------|
| **Name** | `hr-ai-frontend` |
| **Root Directory** | `HR-AI-Portal/frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Auto-Deploy** | Yes |

#### **Step 4: Add Environment Variable**

Click "Advanced" or go to Environment after creation:

```
Key: VITE_API_URL
Value: https://hr-ai-website.onrender.com
```

#### **Step 5: Deploy**

- Click "Create Static Site"
- Wait 2-3 minutes for build
- Frontend will be available at: `https://hr-ai-frontend.onrender.com`

**Expected Build Time:** 2-3 minutes  
**Expected Result:** React app accessible via browser

---

## 🔧 OPTION 2: API USAGE CONFIGURATION

### **API Documentation for Clients:**

#### **Base URL:**
```
https://hr-ai-website.onrender.com
```

#### **Available Endpoints:**

**Authentication:**
```
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
GET /api/auth/me - Get current user
POST /api/auth/logout - Logout user
```

**Users:**
```
GET /api/users - Get all users (admin)
GET /api/users/:id - Get user by ID
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user
```

**Courses:**
```
GET /api/courses - Get all courses
GET /api/courses/:id - Get course by ID
POST /api/courses - Create course (instructor/admin)
PUT /api/courses/:id - Update course
DELETE /api/courses/:id - Delete course
POST /api/courses/:id/enroll - Enroll in course
```

**Lessons:**
```
GET /api/lessons - Get all lessons
GET /api/lessons/:id - Get lesson by ID
POST /api/lessons - Create lesson
PUT /api/lessons/:id - Update lesson
DELETE /api/lessons/:id - Delete lesson
POST /api/lessons/:id/complete - Mark lesson complete
```

**Blog:**
```
GET /api/blog - Get all blog posts
GET /api/blog/:id - Get blog post by ID
POST /api/blog - Create blog post (admin)
PUT /api/blog/:id - Update blog post
DELETE /api/blog/:id - Delete blog post
GET /api/blog/search?q=query - Search blog posts
```

**Chat:**
```
GET /api/chat/rooms - Get all chat rooms
GET /api/chat/rooms/:roomId/messages - Get messages
POST /api/chat/rooms/:roomId/messages - Send message
GET /api/chat/messages/:userId - Get user's messages
```

**Certificates:**
```
GET /api/certificates - Get user certificates
GET /api/certificates/:id - Get certificate by ID
POST /api/certificates - Generate certificate
GET /api/certificates/:id/verify - Verify certificate
```

**OCR:**
```
POST /api/ocr/extract - Extract text from file
POST /api/ocr/extract-batch - Batch extraction
POST /api/ocr/initialize - Initialize OCR service
GET /api/ocr/status - Get OCR status
```

**Health:**
```
GET /health - Health check
GET /metrics - System metrics
```

#### **Authentication:**

**Headers Required:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Get JWT Token:**
```bash
# Register
curl -X POST https://hr-ai-website.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST https://hr-ai-website.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Response will include token
{"success":true,"token":"eyJhbGc...",  "user":{...}}
```

#### **CORS Configuration:**

Frontend domains allowed (from ALLOWED_ORIGINS env var):
- Must be configured in Render environment variables
- Add your frontend URL after deployment

---

## 🗄️ OPTION 3: DATABASE MIGRATIONS

### **Migration Status:**

**Migrations Location:** `HR-AI-Portal/database/migrations/`

**Total Migrations:** 12 files
```
001-create-user.js
002-create-courses.js
003-create-lessons.js
004-create-quizzes.js
005-create-user-course-progress.js
006-create-user-lesson-progress.js
007-create-user-quiz-attempts.js
008-create-blog-posts.js
009-create-chat-messages.js
010-create-certificates.js
011-create-ocr-results.js
012-add-production-indexes.js
```

### **How to Run Migrations on Render:**

#### **Method 1: Use Render Shell (Recommended)**

1. **Go to HR-AI-website service in Render**
2. **Click "Shell" tab** (left sidebar)
3. **Run these commands:**
   ```bash
   # First, check if migrations have run
   npx sequelize-cli db:migrate:status
   
   # If migrations haven't run, execute them
   npx sequelize-cli db:migrate
   ```

**Note:** Migrations need to run from a directory that has the migrations folder.

#### **Method 2: Add Migration to Procfile**

Your Procfile already has:
```
release: npm install && npm install --workspace=backend && cd backend && npm run migrate:prod || true
```

But this path is wrong. Should be updated to run from backend-standalone.

#### **Method 3: Check Tables Exist**

**In Render Shell or database connection:**
```sql
\dt  -- List all tables

-- Should see:
Users
Courses
Lessons
Quizzes
UserCourseProgresses
UserLessonProgresses
UserQuizAttempts
BlogPosts
ChatMessages
Certificates
OCRResults
```

### **Migration Files to Copy:**

Since backend-standalone is deployed but migrations are in HR-AI-Portal, you need to:

**Option A:** Copy migrations to backend-standalone
```bash
cp -r HR-AI-Portal/database/migrations/* backend-standalone/database/migrations/
```

**Option B:** Run migrations directly on database using PSQL

---

## ⚠️ CRITICAL MIGRATION ISSUE

**Problem:** Backend is in `backend-standalone/` but migrations are in `HR-AI-Portal/database/migrations/`

**Solution Options:**

### **Quick Fix: Copy Migrations**

Run this locally:
```bash
# Copy all migrations to backend-standalone
cp HR-AI-Portal/database/migrations/*.js backend-standalone/database/migrations/
```

Then commit and push:
```bash
git add backend-standalone/database/migrations/
git commit -m "Add all database migrations to backend-standalone"
git push origin main
```

Then run in Render Shell:
```bash
npx sequelize-cli db:migrate
```

---

## 📊 EXECUTION ORDER

### **1. First: Deploy Frontend (10 min)**
- Create Static Site on Render
- Configure build settings
- Wait for deployment

### **2. Then: Set Up API Documentation (5 min)**
- Document all endpoints
- Create Postman collection (optional)
- Test key endpoints

### **3. Finally: Run Migrations (15 min)**
- Copy migrations to backend-standalone
- Commit and push
- Run via Render Shell
- Verify tables created

**Total Time:** ~30 minutes

---

## 🎯 IMMEDIATE ACTIONS

### **Action 1: Deploy Frontend NOW**

**Go to Render Dashboard and create Static Site with settings above.**

### **Action 2: Copy Migrations (I'll do this)**

I'll copy all migrations to backend-standalone so they're available for the deployed service.

### **Action 3: Test Migrations (After frontend deploys)**

Once frontend is deploying, we'll run migrations via Render Shell.

---

## ✅ COMPLETION CHECKLIST

- [ ] ⏳ Frontend Static Site created on Render
- [ ] ⏳ Frontend build completes successfully
- [ ] ⏳ Frontend accessible via browser
- [ ] ⏳ CORS updated to allow frontend domain
- [ ] ⏳ Migrations copied to backend-standalone
- [ ] ⏳ Migrations pushed to GitHub
- [ ] ⏳ Migrations run via Render Shell
- [ ] ⏳ Database tables verified
- [ ] ⏳ API endpoints tested
- [ ] ⏳ Complete system verified

---

**Start with Option 1: Go create the Static Site for frontend NOW while I prepare the migrations!**


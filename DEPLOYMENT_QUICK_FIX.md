# 🚨 QUICK FIX: Community Site 404 Errors

## The Problem
Community chat and other API endpoints returning **404 errors** on Render-deployed site.

## Immediate Actions (5 minutes)

### 1️⃣ Access Render Dashboard
- Go to: https://dashboard.render.com
- Sign in with your account

### 2️⃣ Check Backend Status
- Click on **`hr-ai-backend`** service
- Look at top-right corner:
  - ✅ If it says "Live" → Skip to step 5
  - ❌ If it says "Creating", "Building", or "Failed" → Continue to step 3

### 3️⃣ Restart Backend
- Click **"Manual Deploy"** button
- Select **"Latest Commit"**
- Wait 2-3 minutes for deployment to complete
- Logs should show: `Server is running on port 3001`

### 4️⃣ Check Environment Variables
- In backend service, click **"Environment"**
- Look for these variables:
  - `NODE_ENV` = `production` ✅
  - `DATABASE_URL` = Should be set ✅
  - `JWT_SECRET` = Should be set ✅

If any are missing:
  - Click "Add Environment Variable"
  - Add them with appropriate values
  - Click "Save"
  - Redeploy

### 5️⃣ Test It Works
Open your browser and go to:
```
https://hr-ai-frontend-36m6.onrender.com/community
```

- ✅ Should load chat rooms
- ✅ Should show "General", "Announcements", "Networking"
- ✅ Messages section should work

## Still Not Working?

### Check Database
1. Click on **`hr-ai-db`** service
2. Status should say "Available"
3. If not available, click "Restart Database"
4. Wait 2-3 minutes

### Check Logs
1. Click on **`hr-ai-backend`**
2. Click **"Logs"** tab
3. Look for errors like:
   - `Cannot connect to database` → Database issue
   - `ENOENT` → Configuration issue
   - `Cannot find module` → Dependency issue

### Nuclear Option (Last Resort)
If nothing works:
1. Go to backend service settings
2. Click "Delete Service"
3. Delete the database
4. Push a commit to GitHub (any change)
5. Render will auto-redeploy
6. This will reset everything

## Need More Help?

See full guide: `HR-AI-Portal/RENDER_DEPLOYMENT_FIX.md`

---

**⏱️ Estimated Time**: 5-15 minutes
**💾 Data Loss Risk**: Low (unless you delete database)

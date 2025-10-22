# ✅ RENDER DEPLOYMENT CHECKLIST

**Objective**: Fix community site 404 errors on Render
**Time Estimate**: 5-15 minutes
**Start Time**: ___________

---

## PHASE 1: Initial Diagnosis

### Step 1.1: Access Render Dashboard
- [ ] Open browser
- [ ] Go to https://dashboard.render.com
- [ ] Sign in with your account
- [ ] Can see your services and databases

### Step 1.2: Locate Services
- [ ] I can see `hr-ai-backend` service
- [ ] I can see `hr-ai-db` database
- [ ] I can see `hr-ai-frontend` service

### Step 1.3: Check Frontend Status
- [ ] Click on `hr-ai-frontend`
- [ ] Status shows: _________________ (should be "Live")
- [ ] Frontend loads at: https://hr-ai-frontend-36m6.onrender.com

---

## PHASE 2: Backend Investigation

### Step 2.1: Check Backend Service
- [ ] Click on `hr-ai-backend`
- [ ] Current status: _________________ 
  - [ ] Live (skip to Step 3)
  - [ ] Creating/Building (wait 5 min, then recheck)
  - [ ] Failed (continue to Step 2.2)

### Step 2.2: Review Backend Logs
- [ ] Click "Logs" tab
- [ ] Scroll to most recent entries
- [ ] Error messages present: YES / NO
- [ ] If errors, document them:
   ```
   Error 1: _________________________________
   Error 2: _________________________________
   Error 3: _________________________________
   ```

---

## PHASE 3: Environment Variables

### Step 3.1: Check Environment Variables
- [ ] In backend service, click "Environment"
- [ ] Check if `NODE_ENV` exists:
  - [ ] Value: _________________ (should be "production")
- [ ] Check if `DATABASE_URL` exists:
  - [ ] Status: SET / NOT SET
- [ ] Check if `JWT_SECRET` exists:
  - [ ] Status: SET / NOT SET
- [ ] Check if `ALLOWED_ORIGINS` exists:
  - [ ] Status: SET / NOT SET

### Step 3.2: Add Missing Variables (if needed)
If any variables are missing:
- [ ] Click "Add Environment Variable"
- [ ] `NODE_ENV` = `production`
- [ ] `JWT_SECRET` = (generate strong random string, 32+ chars)
- [ ] `ALLOWED_ORIGINS` = `https://hr-ai-frontend-36m6.onrender.com`
- [ ] Click "Save"

---

## PHASE 4: Database Check

### Step 4.1: Verify Database
- [ ] Click on `hr-ai-db` service
- [ ] Status: _________________ (should be "Available")
- [ ] If NOT available:
  - [ ] Click "Restart Database"
  - [ ] Wait 2-3 minutes
  - [ ] Verify status changed to "Available"

### Step 4.2: Database Connection
- [ ] Database is running: YES / NO
- [ ] Connection string appears valid: YES / NO

---

## PHASE 5: Deployment

### Step 5.1: Manual Deploy
- [ ] Go back to `hr-ai-backend`
- [ ] Click "Manual Deploy" button
- [ ] Select "Latest Commit"
- [ ] Deployment started: YES / NO

### Step 5.2: Monitor Deployment
- [ ] Watch the build progress
- [ ] Status changes to "Live": YES / NO
- [ ] Time taken: _________ minutes
- [ ] Any build errors? YES / NO
  - If yes, document: _______________________________

---

## PHASE 6: Verification

### Step 6.1: Test Health Endpoint
- [ ] Open new browser tab
- [ ] Go to: `https://hr-ai-frontend-36m6.onrender.com/api/health`
- [ ] Result: 
  - [ ] 200 OK (success)
  - [ ] 404 Not Found (still broken)
  - [ ] 500 Error (server error)
  - [ ] Other: _________________________________

### Step 6.2: Test Community Site
- [ ] Go to: `https://hr-ai-frontend-36m6.onrender.com`
- [ ] Login with test credentials
- [ ] Navigate to "Community" page
- [ ] Chat loads correctly: YES / NO
- [ ] Can see chat rooms: YES / NO
- [ ] Can send messages: YES / NO

### Step 6.3: Test Other Features
- [ ] Courses page loads: YES / NO
- [ ] Blog posts load: YES / NO
- [ ] Dashboard works: YES / NO
- [ ] Admin panel accessible: YES / NO

---

## PHASE 7: Troubleshooting (if not fixed)

### Issue: Backend still showing 404
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Hard refresh page (Ctrl+F5)
- [ ] Try incognito/private browser window
- [ ] Try different browser
- [ ] Wait 5 minutes and retry
- [ ] Check logs again for new error messages

### Issue: Database connection error
- [ ] Verify DATABASE_URL matches pg connection format
- [ ] Ensure database is "Available" status
- [ ] Restart database and redeploy backend
- [ ] Check if tables exist in database

### Issue: Build fails
- [ ] Click "Clear build cache and redeploy"
- [ ] Check if all dependencies are installed
- [ ] Review error messages in logs carefully

### Issue: Still not working
- [ ] Refer to: `HR-AI-Portal/RENDER_DEPLOYMENT_FIX.md`
- [ ] Try "nuclear option" (delete and recreate services)
- [ ] Contact Render support

---

## FINAL STATUS

**Issue Status**: 
- [ ] ✅ FIXED - Community site working
- [ ] 🟡 PARTIAL - Some features working
- [ ] 🔴 NOT FIXED - Still broken

**Time Spent**: __________ minutes

**Final Notes**:
```
_________________________________________________
_________________________________________________
_________________________________________________
```

**Next Action**: 
- [ ] None needed (fixed!)
- [ ] Follow advanced troubleshooting guide
- [ ] Escalate to Render support
- [ ] Try complete redeploy

---

## QUICK REFERENCE

**Render Dashboard**: https://dashboard.render.com
**Frontend URL**: https://hr-ai-frontend-36m6.onrender.com
**Health Check**: https://hr-ai-frontend-36m6.onrender.com/api/health
**Support Docs**: https://render.com/docs

---

✅ **Remember**: If you make changes, document them at the bottom of this checklist for future reference!

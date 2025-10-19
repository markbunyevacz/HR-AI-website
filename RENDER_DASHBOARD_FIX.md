# Render Dashboard Configuration Fix

## Problem Identified
Render is executing `cd backend && npm start` instead of `cd HR-AI-Portal/backend && npm install && npm start`.

This means:
- The Procfile is being ignored or overridden
- Dashboard has manual configuration that takes precedence
- Dependencies are never installed

## IMMEDIATE ACTION REQUIRED

### Step 1: Check Render Dashboard Settings

1. Go to https://dashboard.render.com
2. Select your `hr-ai-portal` service
3. Go to **Settings** tab
4. Look for these sections:

#### Build & Deploy Section
Check these fields:

- **Build Command**: Should be blank OR `cd HR-AI-Portal/backend && npm install`
- **Start Command**: Check what's here - it's probably `cd backend && npm start` (WRONG)

#### Root Directory
- Should be: `HR-AI-Portal/backend` OR blank

### Step 2: Fix the Dashboard Configuration

Choose ONE of these options:

#### Option A: Use Root Directory (RECOMMENDED)
1. Set **Root Directory**: `HR-AI-Portal/backend`
2. Set **Build Command**: `npm install`
3. Set **Start Command**: `npm start`
4. Save changes
5. Manual Deploy

#### Option B: Use Full Paths
1. Leave **Root Directory**: blank
2. Set **Build Command**: `cd HR-AI-Portal/backend && npm install`
3. Set **Start Command**: `cd HR-AI-Portal/backend && npm start`
4. Save changes
5. Manual Deploy

#### Option C: Use Procfile (if dashboard allows)
1. Set **Build Command**: blank
2. Set **Start Command**: blank
3. Enable "Use Procfile" option (if available)
4. Save changes
5. Manual Deploy

### Step 3: Verify Environment Variables

In the **Environment** section, ensure these are set:
- `NODE_ENV` = `production`
- `DATABASE_URL` = (should be linked to your database)

## What to Look For in Logs

After deploying, check the logs for:

### SUCCESS Indicators:
```
==> Building...
==> Running 'npm install'
added 520 packages
==> Build successful
==> Deploying...
==> Running 'npm start'
Server is running on port 3000
```

### FAILURE Indicators:
```
==> Running 'cd backend && npm start'  ← WRONG PATH
Error: Cannot find module 'sequelize'  ← NO DEPENDENCIES
```

## Alternative Fix (If Dashboard Won't Change)

If Render dashboard is locked or not accepting changes, use this workaround:

### Create a start-production.js script
This script will install dependencies before starting.


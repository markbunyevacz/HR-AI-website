# ✅ COURSES FIX - COMPLETE SETUP GUIDE

## Current Status
✅ Database: Connected to Render PostgreSQL
✅ Backend: Running on port 3001  
✅ Environment: Configured with SSL support
⏳ Courses Data: Ready to seed
⏳ Frontend: Ready to start

## TO FIX \ NO COURSES\ ERROR - DO THIS NOW:

### Step 1: Seed the Database with Courses (Run This Command)
Open a terminal and run:
`
cd C:\Users\Admin\.cursor\HR AI website\HR-AI-Portal\backend
npx sequelize-cli db:seed --seed 013-seed-cahis-courses.js
`

This will populate the database with 9 CAHIS certification courses:
- Introduction to AI Human Impact Strategy
- Fundamentals of AI Technology for HR Professionals
- Change Management Basics for AI Adoption
- Human Impact Assessment Methodology
- C-Level Communication and Influence
- AI Adoption Psychology and Organizational Behavior
- Complex AI Transformation Leadership
- Strategic AI Change Management Execution
- Crisis Prevention and Reputation Management

### Step 2: Start Frontend (Open New Terminal)
`
cd C:\Users\Admin\.cursor\HR AI website\HR-AI-Portal\frontend
npm install
npm run dev
`

### Step 3: Open Browser
Navigate to: http://localhost:5173/courses

You should now see all 9 courses loaded!

## What Happens Behind the Scenes

Frontend (http://localhost:5173)
    ↓ Makes request to /api/courses
    ↓
Vite Proxy (rewrites to backend)
    ↓
Backend (http://localhost:3001)
    ↓ Connects with SSL
    ↓
Render PostgreSQL Database
    ↓ Returns courses
    ↓
Frontend displays courses in grid

## Troubleshooting

### Still seeing 404 errors?
1. Check backend is running: 
pm run dev in backend directory
2. Check console in browser (F12) for exact error
3. Verify backend console shows \Server is running on port 3001\

### Seeding failed?
1. Make sure you ran: npm install (in backend)
2. Check .env file has correct credentials
3. Try again: npx sequelize-cli db:seed:all

### Courses show but are empty?
1. Make sure you ran the seed command
2. Check database directly if needed
3. Refresh the browser

## File Locations
- Backend Config: ackend/src/config/config.js ✅ Updated with SSL
- Environment Variables: ackend/.env ✅ Updated with Render credentials
- Courses API: ackend/src/routes/courses.js
- Frontend Component: rontend/src/pages/Courses.jsx
- Course Seeder: database/migrations/013-seed-cahis-courses.js

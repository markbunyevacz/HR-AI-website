# Fix: Courses Not Loading (404 Error)

## Issue
The Courses page showing \ Failed to fetch courses\ with a 404 error.

## Root Cause
Backend server not running. Frontend tries to fetch from http://localhost:3001/api/courses but server not responding.

## Solution - Quick Start

### 1. Backend Setup (Terminal 1)
`bash
cd backend
npm install
npm run db:migrate
npx sequelize-cli db:seed:all
npm run dev
`

### 2. Frontend Setup (Terminal 2)
`bash
cd frontend
npm install
npm run dev
`

### 3. Access Courses
Navigate to: http://localhost:5173/courses

## Requirements

1. PostgreSQL Database
   - Must be installed and running
   - Create database: CREATE DATABASE hr_ai_portal;
   - Update DB credentials in backend/.env

2. Node.js
   - Required for both frontend and backend

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| ECONNREFUSED 127.0.0.1:5432 | PostgreSQL not running | Start PostgreSQL service |
| database does not exist | DB not created | Run CREATE DATABASE |
| Failed to fetch courses 404 | Backend not running | npm run dev in backend |
| No courses shown | DB not seeded | npx sequelize-cli db:seed:all |

## What Happens

1. Frontend at :5173 makes request to /api/courses
2. Vite proxy redirects to backend at :3001
3. Backend queries PostgreSQL database
4. Returns 9 CAHIS certification courses
5. Frontend displays them in a grid

# HR AI Portal - Setup Guide

This guide will help you set up the HR AI Certification Portal for local development.

## Prerequisites

- **Node.js** (v18 or later): [Download](https://nodejs.org/)
- **npm** (v9 or later): Comes with Node.js
- **PostgreSQL** (v12 or later) OR **Docker**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Git**: [Download](https://git-scm.com/)

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd HR-AI-Portal
```

## Step 2: Backend Setup

### 2.1 Create Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add the following to `backend/.env`:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=hr_ai_portal_dev

# JWT Configuration
JWT_SECRET=your_very_secure_secret_key_change_this
JWT_EXPIRES_IN=1d

# Server Configuration
PORT=3001

# Node Environment
NODE_ENV=development

# Email Configuration (Password Reset & Notifications)
# For development, you can use:
# - MailHog (http://localhost:1025 for SMTP)
# - Ethereal (temporary email service)
# - SendGrid, AWS SES, Gmail SMTP for production

EMAIL_HOST=localhost
EMAIL_PORT=1025
EMAIL_SECURE=false
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=noreply@hrai-portal.com
FRONTEND_URL=http://localhost:5173
```

### 2.2 Install Backend Dependencies

```bash
npm install
```

### 2.3 Set Up PostgreSQL (Option A: Using Docker)

If you have Docker installed, run:

```bash
cd ..
docker-compose up -d
```

This will start PostgreSQL and Redis. Wait for the containers to be healthy (check with `docker-compose ps`).

### 2.3 Set Up PostgreSQL (Option B: Local Installation)

If you have PostgreSQL installed locally:

1. Create a new database:
   ```sql
   CREATE DATABASE hr_ai_portal_dev;
   ```

2. Update `backend/.env` with your PostgreSQL credentials.

### 2.4 Run Database Migrations

```bash
cd backend
npm run sequelize db:migrate
```

### 2.5 Start the Backend Server

```bash
npm run dev
```

The backend server will start on `http://localhost:3001`.

## Step 3: Frontend Setup

### 3.1 Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 3.2 Start the Frontend Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`.

## Step 4: Access the Application

1. Open your browser and go to `http://localhost:5173`
2. You should see the login page
3. Click "Register here" to create a new account
4. Log in with your credentials
5. You'll be redirected to the dashboard

## Troubleshooting

### Backend Connection Issues

If the backend fails to connect to PostgreSQL:

1. Check that PostgreSQL is running:
   ```bash
   # Docker
   docker-compose ps
   
   # Or check local PostgreSQL
   psql -U postgres -d hr_ai_portal_dev
   ```

2. Verify `backend/.env` settings match your database configuration

3. Check backend console for error messages

### Frontend Connection Issues

If the frontend cannot reach the backend API:

1. Ensure the backend is running on `http://localhost:3001`
2. Check the browser console (F12) for CORS errors
3. Verify the API proxy is configured in `frontend/vite.config.js`

### Port Already in Use

If port 3001 or 5173 is already in use:

1. Change the port in `backend/.env` (PORT=3002)
2. Update the proxy in `frontend/vite.config.js`
3. Or kill the process using the port:
   ```bash
   # Windows: lsof -i :3001
   # Mac/Linux: netstat -tulpn | grep :3001
   ```

## Development Workflow

### Running Frontend and Backend Together

You can run both services with:

```bash
npm run dev
```

This will start both frontend and backend concurrently (from the root directory).

### Database Migrations

To create a new migration:

```bash
cd backend
npm run sequelize migration:create --name=migration-name
```

Then edit the migration file in `database/migrations/` and run:

```bash
npm run sequelize db:migrate
```

### Code Formatting

Both frontend and backend support ESLint and Prettier:

```bash
# Backend
npm run lint

# Frontend
npm run lint
```

## Helpful Commands

```bash
# View all running Docker containers
docker-compose ps

# Stop Docker services
docker-compose down

# View Docker logs
docker-compose logs postgres

# Access PostgreSQL console
psql -h localhost -U postgres -d hr_ai_portal_dev
```

## Next Steps

- Read the main [README.md](./README.md) for project overview
- Check the [Implementation Plan](.hr-ai-.plan.md) for feature roadmap
- Review the backend models in `backend/src/models/`
- Explore the frontend components in `frontend/src/components/`

Happy coding!

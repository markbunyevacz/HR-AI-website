# Developer Guide - HR AI Portal

## Quick Start for Developers

### 1. Clone and Setup
```bash
git clone <repository-url>
cd HR-AI-Portal
npm install
```

### 2. Create .env File
```bash
cd backend
cat > .env << EOF
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=hr_ai_portal_dev
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRES_IN=1d
PORT=3001
NODE_ENV=development
EOF
```

### 3. Start Services
```bash
# Terminal 1: Database
docker-compose up -d

# Terminal 2: Backend
cd backend
npm run db:migrate
npm run dev

# Terminal 3: Frontend
cd frontend
npm run dev
```

## Project Architecture

### Frontend (React + Vite)

**Key Directories:**
```
frontend/src/
├── pages/         # Page components (Login, Register, Dashboard)
├── components/    # Reusable UI components
├── context/       # Global state (Auth context)
├── services/      # API calls and utilities
└── styles/        # CSS files
```

**Key Files:**
- `App.jsx` - Main router configuration
- `context/AuthContext.jsx` - Global authentication state
- `components/ProtectedRoute.jsx` - Route protection

### Backend (Node + Express)

**Key Directories:**
```
backend/src/
├── config/        # Configuration files
├── models/        # Sequelize ORM models
├── routes/        # API route definitions
├── middleware/    # Express middleware
├── services/      # Business logic
└── jobs/          # Background job queue
```

**Key Files:**
- `app.js` - Express app setup
- `index.js` - Server entry point
- `models/User.js` - User data model
- `services/authService.js` - Auth logic

## Coding Conventions

### Frontend (React/JavaScript)

1. **Component Naming**: Use PascalCase
   ```jsx
   // ✅ Correct
   function UserProfile() { }
   
   // ❌ Wrong
   function userProfile() { }
   ```

2. **File Organization**: Group related files
   ```
   pages/
   ├── Login.jsx
   ├── Register.jsx
   └── Dashboard.jsx
   ```

3. **State Management**:
   - Use Context API for global state
   - Use `useState` for local component state
   - Use `useEffect` for side effects

4. **Props and Destructuring**:
   ```jsx
   // ✅ Destructure props
   function Component({ firstName, lastName, email }) {
     return <div>{firstName} {lastName}</div>;
   }
   ```

5. **CSS Organization**:
   - One CSS file per page/component
   - Use descriptive class names
   - Keep styles modular and reusable

### Backend (Node.js/JavaScript)

1. **File Naming**: Use camelCase for files
   ```
   ✅ authService.js
   ❌ AuthService.js
   ```

2. **Function Naming**: Use descriptive names
   ```js
   // ✅ Clear
   async function registerUser(userData) { }
   
   // ❌ Vague
   async function handleUser(data) { }
   ```

3. **Error Handling**:
   ```js
   try {
     // code
   } catch (error) {
     console.error('Context: Action failed', error);
     return { success: false, message: error.message };
   }
   ```

4. **Async/Await**: Prefer over Promise chains
   ```js
   // ✅ Preferred
   async function login(email, password) {
     const user = await User.findOne({ where: { email } });
     return user;
   }
   
   // ❌ Avoid
   function login(email, password) {
     return User.findOne({ where: { email } })
       .then(user => user);
   }
   ```

## API Development

### Adding a New Endpoint

1. **Create a route handler** in `backend/src/routes/`:
   ```js
   router.get('/users/:id', authMiddleware, async (req, res) => {
     try {
       const user = await User.findByPk(req.params.id);
       res.json({ success: true, data: user });
     } catch (error) {
       res.status(500).json({ success: false, message: error.message });
     }
   });
   ```

2. **Register the route** in `backend/src/app.js`:
   ```js
   app.use('/api/users', userRoutes);
   ```

3. **Create frontend service** in `frontend/src/services/`:
   ```js
   export const getUser = async (userId, token) => {
     const response = await axios.get(`/api/users/${userId}`, {
       headers: { Authorization: `Bearer ${token}` }
     });
     return response.data;
   };
   ```

4. **Use in React component**:
   ```jsx
   useEffect(() => {
     getUser(userId, token).then(data => setUser(data));
   }, [userId, token]);
   ```

## Database Migrations

### Create a New Migration
```bash
cd backend
npm run sequelize migration:create --name=create-courses-table
```

### Edit and Run Migration
```bash
# Edit the migration file in database/migrations/
npm run db:migrate

# Undo last migration
npm run db:migrate:undo
```

### Migration Template
```js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: { type: Sequelize.UUID, primaryKey: true },
      title: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};
```

## Testing Your Changes

### Backend Testing
```bash
cd backend

# Test specific endpoint with curl
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Check logs
npm run dev  # Watch for errors
```

### Frontend Testing
```bash
cd frontend

# Check browser console (F12)
# Test navigation and form submission
# Verify state changes in React DevTools
```

## Common Issues & Solutions

### Issue: Port Already in Use
```bash
# Kill process on port 3001
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3001
kill -9 <PID>
```

### Issue: Database Connection Failed
```bash
# Check Docker status
docker-compose ps

# Check PostgreSQL logs
docker-compose logs postgres

# Restart services
docker-compose down
docker-compose up -d
```

### Issue: Frontend Can't Reach Backend
1. Ensure backend is running on port 3001
2. Check browser console for CORS errors
3. Verify vite proxy config in `frontend/vite.config.js`

## Git Workflow

### Before Making Changes
```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### Committing Changes
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add user profile update endpoint"

# Push to branch
git push origin feature/your-feature-name
```

### Commit Message Format
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code reorganization
- `test:` Tests
- `chore:` Dependencies, setup

## Performance Tips

### Frontend
- Use React DevTools to check unnecessary renders
- Implement lazy loading for routes
- Optimize images with proper formats
- Use memoization for expensive computations

### Backend
- Add database indexes for frequently queried columns
- Use pagination for large datasets
- Cache frequently accessed data
- Use connection pooling for database

## Security Checklist

- [ ] Passwords are hashed with bcrypt
- [ ] JWT tokens have expiration times
- [ ] All user inputs are validated
- [ ] Protected routes require authentication
- [ ] Sensitive data is not logged
- [ ] HTTPS is used in production
- [ ] Environment variables are not committed
- [ ] SQL injection prevention (using ORM)

## Useful Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code style
npm run preview      # Preview production build

# Backend
npm run dev          # Start dev server
npm run start        # Start production server
npm run db:migrate   # Run migrations
npm run lint         # Check code style

# Docker
docker-compose up -d     # Start services
docker-compose down      # Stop services
docker-compose logs      # View logs
docker-compose ps        # List services
```

## Documentation

- **README.md** - Project overview
- **SETUP.md** - Installation and setup instructions
- **PHASE_1_SUMMARY.md** - Phase 1 completion details
- **Implementation Plan** - Full project roadmap

## Support

For questions or issues:
1. Check existing documentation
2. Review similar code implementations
3. Check git history for changes
4. Ask team members or create an issue

Happy coding! 🚀

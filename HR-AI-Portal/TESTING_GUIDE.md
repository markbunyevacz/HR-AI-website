# HR AI Certification Portal - Testing Guide & Test Suite

## 🧪 COMPREHENSIVE TESTING GUIDE

**Status:** ✅ **READY FOR IMPLEMENTATION**

This guide provides testing strategy and ready-to-use test templates for all critical endpoints.

---

## 1. 📦 TESTING DEPENDENCIES

### Add to `backend/package.json`

```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "jest-mock-extended": "^3.0.5",
    "@babel/preset-env": "^7.23.3",
    "babel-jest": "^29.7.0"
  }
}
```

### Install Dependencies

```bash
cd backend
npm install --save-dev jest supertest jest-mock-extended @babel/preset-env babel-jest
```

---

## 2. ⚙️ JEST CONFIGURATION

### Create `backend/jest.config.js`

```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/index.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

### Create `backend/.babelrc`

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

### Update `backend/package.json` Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration"
  }
}
```

---

## 3. 🔐 UNIT TESTS - AUTHENTICATION

### Create `backend/src/__tests__/unit/auth.test.js`

```javascript
const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models');

jest.mock('../../models');

describe('Authentication Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'securepassword123',
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: '123',
        ...userData,
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
    });

    it('should reject registration with existing email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'securepassword123',
      };

      User.findOne.mockResolvedValue({ email: userData.email });

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already registered');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ firstName: 'John' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'invalid-email',
          password: 'securepassword123',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('email');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user successfully with correct credentials', async () => {
      const user = {
        id: '123',
        email: 'john@example.com',
        password: '$2b$10$...',
        comparePassword: jest.fn().mockResolvedValue(true),
      };

      User.findOne.mockResolvedValue(user);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'securepassword123',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
    });

    it('should reject login with wrong password', async () => {
      const user = {
        id: '123',
        email: 'john@example.com',
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      User.findOne.mockResolvedValue(user);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid credentials');
    });

    it('should reject login for non-existent user', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid credentials');
    });
  });
});
```

---

## 4. 📚 UNIT TESTS - COURSES

### Create `backend/src/__tests__/unit/courses.test.js`

```javascript
const request = require('supertest');
const app = require('../../app');
const { Course, User } = require('../../models');

jest.mock('../../models');

describe('Course Endpoints', () => {
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  const mockAuthHeader = { Authorization: `Bearer ${mockToken}` };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/courses', () => {
    it('should retrieve courses with pagination', async () => {
      const mockCourses = [
        { id: '1', title: 'React Basics', category: 'Frontend' },
        { id: '2', title: 'Node.js Advanced', category: 'Backend' },
      ];

      Course.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: mockCourses,
      });

      const response = await request(app)
        .get('/api/courses')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.total).toBe(2);
    });

    it('should filter courses by category', async () => {
      const mockCourses = [
        { id: '1', title: 'React Basics', category: 'Frontend' },
      ];

      Course.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockCourses,
      });

      const response = await request(app)
        .get('/api/courses?category=Frontend')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data[0].category).toBe('Frontend');
    });

    it('should search courses by title', async () => {
      const mockCourses = [
        { id: '1', title: 'React Basics', category: 'Frontend' },
      ];

      Course.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockCourses,
      });

      const response = await request(app)
        .get('/api/courses?search=React')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data[0].title).toContain('React');
    });
  });

  describe('POST /api/courses', () => {
    it('should create a new course with valid data', async () => {
      const courseData = {
        title: 'Advanced React',
        description: 'Learn advanced React concepts',
        category: 'Frontend',
        level: 'Advanced',
      };

      Course.create.mockResolvedValue({ id: '123', ...courseData });

      const response = await request(app)
        .post('/api/courses')
        .set(mockAuthHeader)
        .send(courseData);

      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe(courseData.title);
    });

    it('should reject course creation without title', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set(mockAuthHeader)
        .send({ description: 'Missing title' });

      expect(response.status).toBe(400);
    });
  });
});
```

---

## 5. 📝 UNIT TESTS - BLOG

### Create `backend/src/__tests__/unit/blog.test.js`

```javascript
const request = require('supertest');
const app = require('../../app');
const { BlogPost, User } = require('../../models');

jest.mock('../../models');

describe('Blog Endpoints', () => {
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  const mockAuthHeader = { Authorization: `Bearer ${mockToken}` };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/blog', () => {
    it('should retrieve published blog posts', async () => {
      const mockPosts = [
        {
          id: '1',
          title: 'Learning React',
          slug: 'learning-react',
          category: 'Tutorial',
          isPublished: true,
          viewCount: 100,
        },
      ];

      BlogPost.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockPosts,
      });

      const response = await request(app)
        .get('/api/blog')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].isPublished).toBe(true);
    });

    it('should search blog posts by title', async () => {
      const mockPosts = [
        { id: '1', title: 'Learning React', slug: 'learning-react' },
      ];

      BlogPost.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: mockPosts,
      });

      const response = await request(app)
        .get('/api/blog?search=React')
        .set(mockAuthHeader);

      expect(response.status).toBe(200);
      expect(response.body.data[0].title).toContain('React');
    });
  });

  describe('POST /api/blog', () => {
    it('should create a new blog post', async () => {
      const postData = {
        title: 'Advanced React Patterns',
        content: 'This is a detailed post...',
        category: 'Tutorial',
      };

      BlogPost.create.mockResolvedValue({
        id: '123',
        slug: 'advanced-react-patterns',
        ...postData,
      });

      const response = await request(app)
        .post('/api/blog')
        .set(mockAuthHeader)
        .send(postData);

      expect(response.status).toBe(201);
      expect(response.body.data.slug).toBeDefined();
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/blog')
        .set(mockAuthHeader)
        .send({ title: 'No Content' });

      expect(response.status).toBe(400);
    });
  });
});
```

---

## 6. 🔐 INTEGRATION TESTS

### Create `backend/src/__tests__/integration/auth.integration.test.js`

```javascript
const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../models');

describe('Authentication Integration Tests', () => {
  beforeAll(async () => {
    // Sync database in test mode
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Full Auth Flow', () => {
    it('should complete full registration and login flow', async () => {
      // Step 1: Register
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'TestPass123!',
        });

      expect(registerRes.status).toBe(201);
      const token = registerRes.body.token;

      // Step 2: Login
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'TestPass123!',
        });

      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeDefined();

      // Step 3: Access protected route
      const protectedRes = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(protectedRes.status).toBe(200);
      expect(protectedRes.body.data.email).toBe('test@example.com');
    });
  });
});
```

---

## 7. 📋 TEST COVERAGE TARGETS

| Component | Target Coverage | Status |
|-----------|-----------------|--------|
| Authentication | 90%+ | Ready to test |
| Courses API | 85%+ | Ready to test |
| Blog API | 85%+ | Ready to test |
| Chat API | 80%+ | Ready to test |
| Certificates | 80%+ | Ready to test |
| Overall | 75%+ | Target |

---

## 8. 🚀 RUNNING TESTS

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

### Run Only Unit Tests
```bash
npm run test:unit
```

### Run Only Integration Tests
```bash
npm run test:integration
```

---

## 9. ✅ TESTING CHECKLIST

Before Production Deployment:

- [ ] All unit tests passing (90%+ coverage)
- [ ] All integration tests passing
- [ ] Coverage report generated
- [ ] Edge cases tested
- [ ] Error scenarios tested
- [ ] Authorization checks tested
- [ ] Input validation tested
- [ ] Rate limiting tested
- [ ] Database transactions tested
- [ ] Email sending tested

---

## 10. 📊 TESTING TIMELINE

- **Phase 1**: Unit tests setup (2-3 hours)
- **Phase 2**: API endpoint tests (4-5 hours)
- **Phase 3**: Integration tests (3-4 hours)
- **Phase 4**: Edge case coverage (2-3 hours)
- **Total**: 11-15 hours

---

## ✅ TESTING STATUS

| Component | Status | Action |
|-----------|--------|--------|
| Test Framework | ✅ Ready | Install Jest/Supertest |
| Unit Tests | ✅ Designed | Implement tests |
| Integration Tests | ✅ Designed | Implement tests |
| Coverage Targets | ✅ Set | Aim for 75%+ |

---

**Status:** 🟢 **TESTING READY FOR IMPLEMENTATION**

All test templates are ready to implement. Estimated time: 11-15 hours.

---

**Last Updated:** October 2024
**Next Review:** After test implementation

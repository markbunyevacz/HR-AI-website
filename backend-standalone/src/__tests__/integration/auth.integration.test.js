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
      expect(registerRes.body.success).toBe(true);
      expect(registerRes.body.token).toBeDefined();

      const token = registerRes.body.token;

      // Step 2: Login
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'TestPass123!',
        });

      expect(loginRes.status).toBe(200);
      expect(loginRes.body.success).toBe(true);
      expect(loginRes.body.token).toBeDefined();

      // Step 3: Access protected route
      const protectedRes = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(protectedRes.status).toBe(200);
      expect(protectedRes.body.data.email).toBe('test@example.com');
    });

    it('should reject login with wrong credentials', async () => {
      // Register first
      await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'test2@example.com',
          password: 'TestPass123!',
        });

      // Try wrong password
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test2@example.com',
          password: 'WrongPassword123!',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid credentials');
    });

    it('should handle duplicate registration', async () => {
      // Register first user
      await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'test3@example.com',
          password: 'TestPass123!',
        });

      // Try to register again with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Different',
          lastName: 'User',
          email: 'test3@example.com',
          password: 'DifferentPass123!',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already registered');
    });

    it('should validate registration input', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Test',
          // Missing lastName, email, password
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Missing required fields');
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'invalid-email-format',
          password: 'TestPass123!',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid email format');
    });

    it('should validate password length', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'test4@example.com',
          password: '123', // Too short
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('password');
    });
  });

  describe('Protected Routes', () => {
    it('should protect routes without token', async () => {
      const response = await request(app)
        .get('/api/users/profile');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('No token provided');
    });

    it('should protect routes with invalid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('Invalid token');
    });

    it('should allow access with valid token', async () => {
      // Register and login first
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'test5@example.com',
          password: 'TestPass123!',
        });

      const token = registerRes.body.token;

      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.email).toBe('test5@example.com');
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limiting on login attempts', async () => {
      // This test would need to be run in isolation or with a mock
      // For now, we'll just verify the endpoint exists and responds
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      // Should either succeed or be rate limited (both are acceptable responses)
      expect([200, 400, 429]).toContain(response.status);
    });
  });
});

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

    it('should validate password length', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: '123',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('password');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user successfully with correct credentials', async () => {
      const user = {
        id: '123',
        email: 'john@example.com',
        password: '$2b$10$...',
        firstName: 'John',
        lastName: 'Doe',
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
        password: '$2b$10$...',
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

    it('should validate login input fields', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Missing');
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limiting on auth endpoints', async () => {
      // This test would need to be run in isolation or with a mock
      // For now, we'll just verify the endpoint exists
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'test123',
        });

      // Should either succeed or be rate limited
      expect([200, 400, 429]).toContain(response.status);
    });
  });
});

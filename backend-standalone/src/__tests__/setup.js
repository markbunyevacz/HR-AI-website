// Jest setup file
// This file runs before each test suite

// Mock database connection for tests
jest.mock('../models', () => {
  const mockModels = {
    User: {
      findOne: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
    Course: {
      findAndCountAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
    BlogPost: {
      findAndCountAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
    ChatMessage: {
      findAll: jest.fn(),
      create: jest.fn(),
    },
    Certificate: {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    },
  };

  return mockModels;
});

// Mock JWT for authentication tests
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mock-jwt-token'),
  verify: jest.fn(() => ({ id: '123', role: 'user' })),
}));

// Mock bcrypt for password hashing tests
jest.mock('bcrypt', () => ({
  genSalt: jest.fn(() => Promise.resolve('mock-salt')),
  hash: jest.fn(() => Promise.resolve('mock-hashed-password')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRES_IN = '1h';

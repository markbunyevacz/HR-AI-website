#!/usr/bin/env node

/**
 * Database Seeder Runner
 * 
 * This script runs the CAHIS course and blog post seeders to populate the database
 * with test data for the HR AI Portal.
 * 
 * Usage:
 *   node run-seeders.js
 * 
 * Or from package.json:
 *   npm run seed
 */

const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Import migrations
const seedCourses = require('./migrations/013-seed-cahis-courses');
const seedBlogPosts = require('./migrations/014-seed-blog-posts');

// Database configuration
const config = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false,
  },
  production: {
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DATABASE_URL ? {
        require: true,
        rejectUnauthorized: false,
      } : false,
    },
    logging: false,
  },
};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, dbConfig)
  : new Sequelize(dbConfig);

async function runSeeders() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established\n');

    const queryInterface = sequelize.getQueryInterface();

    // Run course seeder
    console.log('📚 Seeding CAHIS courses...');
    await seedCourses.up(queryInterface, Sequelize);
    console.log('');

    // Run blog post seeder
    console.log('📝 Seeding blog posts...');
    await seedBlogPosts.up(queryInterface, Sequelize);
    console.log('');

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('You can now:');
    console.log('  - View courses at /courses');
    console.log('  - Read blog posts at /blog');
    console.log('  - Enroll in CAHIS certification courses\n');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Run if called directly
if (require.main === module) {
  runSeeders();
}

module.exports = { runSeeders };


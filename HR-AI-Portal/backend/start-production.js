#!/usr/bin/env node

/**
 * Production Start Script
 * Ensures dependencies are installed before starting the application
 * This is a workaround for Render.com deployment issues
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('==> Production Start Script');
console.log('==> Working directory:', process.cwd());

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
const nodeModulesExists = fs.existsSync(nodeModulesPath);

console.log('==> node_modules exists:', nodeModulesExists);

// Check if sequelize exists in node_modules
const sequelizePath = path.join(nodeModulesPath, 'sequelize');
const sequelizeExists = fs.existsSync(sequelizePath);

console.log('==> sequelize exists:', sequelizeExists);

// If node_modules doesn't exist or sequelize is missing, install dependencies
if (!nodeModulesExists || !sequelizeExists) {
  console.log('==> Installing dependencies...');
  try {
    execSync('npm install', {
      stdio: 'inherit',
      cwd: __dirname
    });
    console.log('==> Dependencies installed successfully');
  } catch (error) {
    console.error('==> Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('==> Dependencies already installed');
}

// Verify sequelize is now available
try {
  const Sequelize = require('sequelize');
  console.log('==> Sequelize version:', Sequelize.version);
} catch (error) {
  console.error('==> Sequelize still not available:', error.message);
  console.error('==> Attempting to reinstall...');
  try {
    execSync('npm install sequelize pg pg-hstore', {
      stdio: 'inherit',
      cwd: __dirname
    });
  } catch (installError) {
    console.error('==> Failed to install sequelize:', installError.message);
    process.exit(1);
  }
}

// Start the application
console.log('==> Starting application...');
console.log('==> Node version:', process.version);
console.log('==> Environment:', process.env.NODE_ENV || 'development');

try {
  require('./src/index.js');
} catch (error) {
  console.error('==> Failed to start application:', error.message);
  console.error(error.stack);
  process.exit(1);
}


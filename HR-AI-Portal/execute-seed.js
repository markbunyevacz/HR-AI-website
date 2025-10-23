#!/usr/bin/env node

/**
 * Database Seeder - Blog Posts
 * Executes the blog posts seeding script against the production database
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const DATABASE_URL = 'postgresql://hr_ai_portal_user:wKgijmeqbOlDrYXJgugNkU0dh5XvRApB@dpg-d3qbiu0gjchc73b6up40-a/hr_ai_portal';

async function seedBlog() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    console.log('🚀 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully\n');

    // Read the SQL file
    const sqlFile = path.join(__dirname, 'scripts', 'seed-blog-production.sql');
    const sql = fs.readFileSync(sqlFile, 'utf-8');
    
    console.log('📝 Executing blog posts seeding script...\n');
    
    // Execute the SQL
    const result = await client.query(sql);
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   - Blog posts table populated');
    console.log('   - 10 blog posts inserted');
    console.log('\n🎉 Blog feature is now ready!');
    console.log('   Visit: /blog to see the posts\n');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seedBlog();

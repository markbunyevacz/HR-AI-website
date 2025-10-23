const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Auto-seed blog posts if they don't exist
const { autoSeedBlog } = require('./migrations/auto-seed-blog');

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Seed blog posts on startup (non-blocking)
  try {
    await autoSeedBlog();
  } catch (error) {
    console.error('Warning: Could not auto-seed blog posts:', error.message);
  }
});

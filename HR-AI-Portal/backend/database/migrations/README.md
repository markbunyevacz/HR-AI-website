# Migration Files - DEPRECATED LOCATION

## ⚠️ NOTICE: These migrations have been consolidated

**Status:** DEPRECATED  
**Date:** October 18, 2025

## Migration Consolidation

All database migrations have been consolidated to the main migrations directory:

**New Location:** `database/migrations/`

### Consolidated Files

The files in this directory have been copied to the main migrations folder with updated numbering:

| Old File (backend/database/migrations/) | New File (database/migrations/) |
|----------------------------------------|----------------------------------|
| `008-create-ocr-results.js` | `011-create-ocr-results.js` |
| `009-add-production-indexes.js` | `012-add-production-indexes.js` |

## Why Consolidation?

- **Single Source of Truth:** All migrations in one location
- **Sequential Numbering:** Proper migration order (001-012)
- **Easier Management:** Simplified migration tracking
- **Consistency:** Matches original project plan

## Migration Order

Complete migration sequence in `database/migrations/`:

1. `001-create-user.js` - User authentication
2. `002-create-courses.js` - Course management
3. `003-create-lessons.js` - Lesson content
4. `004-create-quizzes.js` - Quiz system
5. `005-create-user-course-progress.js` - Course enrollment tracking
6. `006-create-user-lesson-progress.js` - Lesson completion tracking
7. `007-create-user-quiz-attempts.js` - Quiz attempt history
8. `008-create-blog-posts.js` - Blog system
9. `009-create-chat-messages.js` - Chat messaging
10. `010-create-certificates.js` - Certificate generation
11. `011-create-ocr-results.js` - OCR processing results
12. `012-add-production-indexes.js` - Performance indexes

## Action Required

**For Future Development:**
- Use migrations from `database/migrations/` directory only
- Files in this directory are kept as backup only
- Do NOT create new migrations in this location

## Sequelize Configuration

Ensure your `.sequelizerc` or config points to:
```javascript
{
  'migrations-path': './database/migrations'
}
```

---

**Last Updated:** October 18, 2025  
**Migration Consolidation:** Complete ✅


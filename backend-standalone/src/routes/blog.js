const express = require('express');
const router = express.Router();
const { BlogPost, User } = require('../models');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Get all published blog posts with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, tag } = req.query;
    const offset = (page - 1) * limit;

    const where = { isPublished: true };
    if (category) where.category = category;
    if (search) {
      where.title = { [require('sequelize').Op.iLike]: `%${search}%` };
    }
    if (tag) {
      where.tags = {
        [require('sequelize').Op.contains]: [tag],
      };
    }

    const { count, rows } = await BlogPost.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
      order: [['publishedAt', 'DESC']],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: error.message,
    });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      where: { slug: req.params.slug, isPublished: true },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'bio'],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Increment view count
    await post.increment('viewCount');

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message,
    });
  }
});

// Create blog post (admin/instructor only)
router.post('/', authMiddleware, roleMiddleware(['admin', 'instructor']), async (req, res) => {
  try {
    const { title, content, excerpt, featuredImage, category, tags, isPublished } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      });
    }

    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const post = await BlogPost.create({
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      category,
      tags: tags || [],
      isPublished,
      publishedAt: isPublished ? new Date() : null,
      authorId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created',
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message,
    });
  }
});

// Update blog post (author/admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    if (post.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      });
    }

    const { title, content, excerpt, featuredImage, category, tags, isPublished } = req.body;

    await post.update({
      title: title || post.title,
      content: content || post.content,
      excerpt: excerpt !== undefined ? excerpt : post.excerpt,
      featuredImage: featuredImage !== undefined ? featuredImage : post.featuredImage,
      category: category || post.category,
      tags: tags !== undefined ? tags : post.tags,
      isPublished: isPublished !== undefined ? isPublished : post.isPublished,
      publishedAt: isPublished && !post.publishedAt ? new Date() : post.publishedAt,
    });

    res.json({
      success: true,
      message: 'Blog post updated',
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message,
    });
  }
});

// Delete blog post (author/admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    if (post.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    await post.destroy();

    res.json({
      success: true,
      message: 'Blog post deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message,
    });
  }
});

module.exports = router;

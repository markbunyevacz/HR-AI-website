'use strict';

/**
 * Migration: Create Blog Posts Table
 * Creates the blog_posts table with full-text search support
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      excerpt: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      featuredImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      authorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: 'General',
      },
      tags: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      publishedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Add indexes for performance
    await queryInterface.addIndex('blog_posts', ['authorId']);
    await queryInterface.addIndex('blog_posts', ['category']);
    await queryInterface.addIndex('blog_posts', ['isPublished']);
    await queryInterface.addIndex('blog_posts', ['publishedAt']);
    await queryInterface.addIndex('blog_posts', ['slug'], { unique: true });
    await queryInterface.addIndex('blog_posts', ['createdAt']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};


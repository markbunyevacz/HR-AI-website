'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      shortDescription: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: 'General',
      },
      level: {
        type: Sequelize.ENUM('Beginner', 'Intermediate', 'Advanced'),
        defaultValue: 'Beginner',
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      instructorId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      enrollmentCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 0,
      },
      ratingCount: {
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

    await queryInterface.addIndex('courses', ['instructorId']);
    await queryInterface.addIndex('courses', ['category']);
    await queryInterface.addIndex('courses', ['isPublished']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  },
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_lesson_progress', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      lessonId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'lessons',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      timeSpent: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      viewedAt: {
        type: Sequelize.DATE,
        allowNull: true,
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

    await queryInterface.addConstraint('user_lesson_progress', {
      fields: ['userId', 'lessonId'],
      type: 'unique',
      name: 'unique_user_lesson',
    });

    await queryInterface.addIndex('user_lesson_progress', ['userId']);
    await queryInterface.addIndex('user_lesson_progress', ['lessonId']);
    await queryInterface.addIndex('user_lesson_progress', ['isCompleted']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_lesson_progress');
  },
};

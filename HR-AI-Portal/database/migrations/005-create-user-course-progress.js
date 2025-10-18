'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_course_progress', {
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
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      enrolledAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      progressPercentage: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      lastAccessedAt: {
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

    await queryInterface.addConstraint('user_course_progress', {
      fields: ['userId', 'courseId'],
      type: 'unique',
      name: 'unique_user_course',
    });

    await queryInterface.addIndex('user_course_progress', ['userId']);
    await queryInterface.addIndex('user_course_progress', ['courseId']);
    await queryInterface.addIndex('user_course_progress', ['isCompleted']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_course_progress');
  },
};

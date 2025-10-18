'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_quiz_attempts', {
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
      quizId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'quizzes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      attemptNumber: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      answers: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      scorePercentage: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      passed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      timeTaken: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      startedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      submittedAt: {
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

    await queryInterface.addIndex('user_quiz_attempts', ['userId']);
    await queryInterface.addIndex('user_quiz_attempts', ['quizId']);
    await queryInterface.addIndex('user_quiz_attempts', ['userId', 'quizId']);
    await queryInterface.addIndex('user_quiz_attempts', ['passed']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_quiz_attempts');
  },
};

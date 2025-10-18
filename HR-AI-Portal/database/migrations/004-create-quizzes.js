'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quizzes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      questions: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      passingScore: {
        type: Sequelize.INTEGER,
        defaultValue: 70,
      },
      timeLimit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      allowRetake: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      maxAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 3,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    await queryInterface.addIndex('quizzes', ['lessonId']);
    await queryInterface.addIndex('quizzes', ['isPublished']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quizzes');
  },
};

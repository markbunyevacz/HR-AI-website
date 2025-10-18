'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ocr_results', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      jobId: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Bull job queue ID',
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fileType: {
        type: Sequelize.ENUM('pdf', 'image'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'processing', 'completed', 'failed'),
        defaultValue: 'pending',
      },
      rawText: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      confidence: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
        comment: 'OCR confidence score 0-100',
      },
      extractedData: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Structured extracted data (emails, phones, dates, names, skills)',
      },
      errorMessage: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      processingStartedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      processingCompletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Add indexes
    await queryInterface.addIndex('ocr_results', ['userId']);
    await queryInterface.addIndex('ocr_results', ['jobId']);
    await queryInterface.addIndex('ocr_results', ['status']);
    await queryInterface.addIndex('ocr_results', ['createdAt']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ocr_results');
  },
};

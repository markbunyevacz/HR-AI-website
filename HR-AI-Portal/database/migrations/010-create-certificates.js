'use strict';

/**
 * Migration: Create Certificates Table
 * Creates the certificates table for course completion certificates
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('certificates', {
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
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      certificateNumber: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      issuedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      pdfUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verificationCode: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
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
    await queryInterface.addIndex('certificates', ['userId']);
    await queryInterface.addIndex('certificates', ['courseId']);
    await queryInterface.addIndex('certificates', ['verificationCode'], { unique: true });
    await queryInterface.addIndex('certificates', ['certificateNumber'], { unique: true });
    await queryInterface.addIndex('certificates', ['userId', 'courseId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('certificates');
  }
};


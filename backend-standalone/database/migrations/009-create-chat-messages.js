'use strict';

/**
 * Migration: Create Chat Messages Table
 * Creates the chat_messages table for real-time messaging
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chat_messages', {
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
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      room: {
        type: Sequelize.STRING,
        defaultValue: 'general',
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
    await queryInterface.addIndex('chat_messages', ['userId']);
    await queryInterface.addIndex('chat_messages', ['room']);
    await queryInterface.addIndex('chat_messages', ['createdAt']);
    await queryInterface.addIndex('chat_messages', ['room', 'createdAt']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chat_messages');
  }
};


const express = require('express');
const router = express.Router();
const { ChatMessage, User } = require('../models');
const { authMiddleware } = require('../middleware/auth');

// Get message history for a room
router.get('/messages/:room', authMiddleware, async (req, res) => {
  try {
    const { room } = req.params;
    const { limit = 50, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const messages = await ChatMessage.findAll({
      where: { room },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      success: true,
      data: messages.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message,
    });
  }
});

// Save a message
router.post('/messages', authMiddleware, async (req, res) => {
  try {
    const { content, room = 'general' } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message content is required',
      });
    }

    const message = await ChatMessage.create({
      userId: req.user.id,
      content: content.trim(),
      room,
    });

    const messageWithUser = await ChatMessage.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: messageWithUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving message',
      error: error.message,
    });
  }
});

// Get available chat rooms
router.get('/rooms', authMiddleware, async (req, res) => {
  try {
    const rooms = await ChatMessage.findAll({
      attributes: [
        [require('sequelize').fn('DISTINCT', require('sequelize').col('room')), 'room'],
      ],
      raw: true,
    });

    res.json({
      success: true,
      data: rooms.map(r => r.room),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms',
      error: error.message,
    });
  }
});

module.exports = router;

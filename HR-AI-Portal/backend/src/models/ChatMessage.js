module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      defaultValue: 'general',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
    tableName: 'chat_messages',
    indexes: [
      { fields: ['userId'] },
      { fields: ['room'] },
      { fields: ['createdAt'] },
    ],
  });

  ChatMessage.associate = (models) => {
    ChatMessage.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return ChatMessage;
};

module.exports = (sequelize, DataTypes) => {
  const UserQuizAttempt = sequelize.define('UserQuizAttempt', {
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
    quizId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'quizzes',
        key: 'id',
      },
    },
    attemptNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'User answers for each question',
    },
    score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    scorePercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    passed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    timeTaken: {
      type: DataTypes.INTEGER, // in seconds
      allowNull: true,
    },
    startedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'user_quiz_attempts',
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['quizId'],
      },
      {
        fields: ['userId', 'quizId'],
      },
    ],
  });

  UserQuizAttempt.associate = (models) => {
    UserQuizAttempt.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    UserQuizAttempt.belongsTo(models.Quiz, {
      foreignKey: 'quizId',
      onDelete: 'CASCADE',
    });
  };

  return UserQuizAttempt;
};

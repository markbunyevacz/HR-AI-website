module.exports = (sequelize, DataTypes) => {
  const UserLessonProgress = sequelize.define('UserLessonProgress', {
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
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'lessons',
        key: 'id',
      },
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    timeSpent: {
      type: DataTypes.INTEGER, // in seconds
      defaultValue: 0,
    },
    viewedAt: {
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
    tableName: 'user_lesson_progress',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'lessonId'],
        name: 'unique_user_lesson',
      },
      {
        fields: ['userId'],
      },
      {
        fields: ['lessonId'],
      },
    ],
  });

  UserLessonProgress.associate = (models) => {
    UserLessonProgress.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    UserLessonProgress.belongsTo(models.Lesson, {
      foreignKey: 'lessonId',
      onDelete: 'CASCADE',
    });
  };

  return UserLessonProgress;
};

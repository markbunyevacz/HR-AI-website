module.exports = (sequelize, DataTypes) => {
  const UserCourseProgress = sequelize.define('UserCourseProgress', {
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
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
    },
    enrolledAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    progressPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      validate: { min: 0, max: 100 },
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastAccessedAt: {
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
    tableName: 'user_course_progress',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'courseId'],
        name: 'unique_user_course',
      },
      {
        fields: ['userId'],
      },
      {
        fields: ['courseId'],
      },
    ],
  });

  UserCourseProgress.associate = (models) => {
    UserCourseProgress.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    UserCourseProgress.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
    });
  };

  return UserCourseProgress;
};

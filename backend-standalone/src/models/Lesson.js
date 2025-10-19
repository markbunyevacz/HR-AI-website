module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resourceUrls: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    duration: {
      type: DataTypes.INTEGER, // in minutes
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('Video', 'Article', 'Quiz', 'Assignment', 'Interactive'),
      defaultValue: 'Article',
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: 'lessons',
  });

  Lesson.associate = (models) => {
    Lesson.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
    });
    Lesson.hasMany(models.UserLessonProgress, {
      foreignKey: 'lessonId',
      onDelete: 'CASCADE',
    });
    Lesson.hasMany(models.Quiz, {
      foreignKey: 'lessonId',
      onDelete: 'CASCADE',
    });
  };

  return Lesson;
};

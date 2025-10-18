module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'lessons',
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
    questions: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'Array of questions with options and answers',
    },
    passingScore: {
      type: DataTypes.INTEGER,
      defaultValue: 70,
      validate: { min: 0, max: 100 },
    },
    timeLimit: {
      type: DataTypes.INTEGER, // in minutes
      allowNull: true,
    },
    allowRetake: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    maxAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
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
    tableName: 'quizzes',
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Lesson, {
      foreignKey: 'lessonId',
      onDelete: 'CASCADE',
    });
    Quiz.hasMany(models.UserQuizAttempt, {
      foreignKey: 'quizId',
      onDelete: 'CASCADE',
    });
  };

  return Quiz;
};

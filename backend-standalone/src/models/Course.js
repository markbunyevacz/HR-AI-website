module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'General',
    },
    level: {
      type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
      defaultValue: 'Beginner',
    },
    duration: {
      type: DataTypes.INTEGER, // in hours
      allowNull: true,
    },
    instructorId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    enrollmentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
      validate: { min: 0, max: 5 },
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    tableName: 'courses',
  });

  Course.associate = (models) => {
    Course.hasMany(models.Lesson, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
    });
    Course.belongsTo(models.User, {
      foreignKey: 'instructorId',
      as: 'instructor',
    });
    Course.hasMany(models.UserCourseProgress, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
    });
    // Review model not yet implemented
    // Course.hasMany(models.Review, {
    //   foreignKey: 'courseId',
    //   onDelete: 'CASCADE',
    // });
  };

  return Course;
};

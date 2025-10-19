module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
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
    certificateNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    issuedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verificationCode: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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
    tableName: 'certificates',
    indexes: [
      { fields: ['userId'] },
      { fields: ['courseId'] },
      { fields: ['verificationCode'] },
    ],
  });

  Certificate.associate = (models) => {
    Certificate.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Certificate.belongsTo(models.Course, {
      foreignKey: 'courseId',
      as: 'course',
    });
  };

  return Certificate;
};

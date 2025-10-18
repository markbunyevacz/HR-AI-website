module.exports = (sequelize, DataTypes) => {
  const OCRResult = sequelize.define('OCRResult', {
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
    jobId: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Bull job queue ID',
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileType: {
      type: DataTypes.ENUM('pdf', 'image'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
      defaultValue: 'pending',
    },
    rawText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    confidence: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: 'OCR confidence score 0-100',
    },
    extractedData: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Structured extracted data (emails, phones, dates, names, skills)',
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    processingStartedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    processingCompletedAt: {
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
    tableName: 'ocr_results',
    indexes: [
      { fields: ['userId'] },
      { fields: ['jobId'] },
      { fields: ['status'] },
      { fields: ['createdAt'] },
    ],
  });

  OCRResult.associate = (models) => {
    OCRResult.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return OCRResult;
};

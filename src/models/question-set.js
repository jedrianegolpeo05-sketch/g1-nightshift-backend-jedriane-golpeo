'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionSet = sequelize.define('QuestionSet', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING, allowNull: false },
    difficulty_level: { type: DataTypes.ENUM('easy','medium','hard'), allowNull: false },
    total_items: { type: DataTypes.INTEGER, defaultValue: 10 },
    time_limit_minutes: { type: DataTypes.INTEGER, defaultValue: 15 },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.INTEGER },
    school_id: { type: DataTypes.INTEGER }
  }, {
    tableName: 'question_sets',
    underscored: true,
    timestamps: true
  });
  return QuestionSet;
};
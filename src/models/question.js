'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question_set_id: { type: DataTypes.INTEGER, allowNull: false },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    question_type: { type: DataTypes.STRING, defaultValue: 'MULTIPLE_CHOICE' },
    options: { type: DataTypes.JSON },
    correct_answer: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.INTEGER, defaultValue: 1 },
    order_index: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, { tableName: 'questions', underscored: true, timestamps: true });
  return Question;
};
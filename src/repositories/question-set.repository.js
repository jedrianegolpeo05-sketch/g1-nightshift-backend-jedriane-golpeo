const { QuestionSet } = require('../models');

exports.findAll = async () => {
  return await QuestionSet.findAll();
};

exports.findById = async (id) => {
  return await QuestionSet.findByPk(id);
};

exports.create = async (data) => {
  return await QuestionSet.create(data);
};

exports.update = async (id, data) => {
  const item = await QuestionSet.findByPk(id);
  if (!item) return null;
  return await item.update(data);
};

exports.delete = async (id) => {
  const item = await QuestionSet.findByPk(id);
  if (!item) return null;
  return await item.destroy();
};
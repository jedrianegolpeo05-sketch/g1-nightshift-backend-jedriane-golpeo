const { sequelize } = require('../models');

function getModel() {
  return sequelize.models.QuestionSet || sequelize.models.question_sets || sequelize.models.QuestionSets;
}

async function list() {
  const Model = getModel();
  return Model.findAll();
}

async function getById(id) {
  const Model = getModel();
  return Model.findByPk(id);
}

async function create(data) {
  const Model = getModel();
  return Model.create(data);
}

async function update(id, data) {
  const Model = getModel();
  const row = await Model.findByPk(id);
  if (!row) return null;
  return row.update(data);
}

async function remove(id) {
  const Model = getModel();
  const row = await Model.findByPk(id);
  if (!row) return 0;
  await row.destroy();
  return 1;
}

module.exports = { list, getById, create, update, remove };
const repo = require('../repositories/question-set.repository');

exports.list = async () => {
  return repo.findAll();
};

exports.getOne = async (id) => {
  const item = await repo.findById(id);
  if (!item) {
    const err = new Error('QuestionSet not found');
    err.status = 404;
    throw err;
  }
  return item;
};

exports.create = async (body, user) => {
  const data = {
    title: body.title,
    description: body.description,
    category: body.category,
    difficulty_level: body.difficulty_level,
    total_items: body.total_items,
    time_limit_minutes: body.time_limit_minutes,
    is_active: body.is_active,
    created_by: user ? user.id : null
  };
  return repo.create(data);
};

exports.update = async (id, body) => {
  await exports.getOne(id);
  return repo.update(id, body);
};

exports.delete = async (id) => {
  await exports.getOne(id);
  return repo.delete(id);
};
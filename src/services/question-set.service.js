const repo = require('../repositories/question-set.repository');

exports.list = async () => repo.list();

exports.getOne = async (id) => {
  if (isNaN(id)) {
    const e = new Error('Question set not found');
    e.status = 404;
    throw e;
  }
  const data = await repo.getById(id);
  if (!data) {
    const e = new Error('Question set not found');
    e.status = 404;
    throw e;
  }
  return data;
};

exports.create = async (body, user) => repo.create(body, user);

exports.update = async (id, body, user) => {
  const data = await repo.getById(id);
  if (!data) {
    const e = new Error('Question set not found');
    e.status = 404;
    throw e;
  }
  if (user && data.created_by !== user.id && user.role !== 'ADMIN') {
    const e = new Error('This question set belongs to another host.');
    e.status = 403;
    e.code = 'FORBIDDEN';
    throw e;
  }
  return repo.update(id, body);
};

exports.delete = async (id, user) => {
  const data = await repo.getById(id);
  if (!data) {
    const e = new Error('Question set not found');
    e.status = 404;
    throw e;
  }
  if (user && data.created_by !== user.id && user.role !== 'ADMIN') {
    const e = new Error('This question set belongs to another host.');
    e.status = 403;
    e.code = 'FORBIDDEN';
    throw e;
  }
  return repo.delete(id);
};

exports.addQuestion = async (setId, payload, user) => {
  const data = await repo.getById(setId);
  if (!data) {
    const e = new Error('Question set not found');
    e.status = 404;
    throw e;
  }
  return repo.addQuestion(setId, payload);
};
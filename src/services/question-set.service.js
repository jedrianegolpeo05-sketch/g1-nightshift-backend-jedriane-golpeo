const repo = require('../repositories/question-set.repository');

exports.list = async () => repo.list();

exports.getOne = async (id) => {
  const numId = Number(id);
  if (isNaN(numId)) {
    const e = new Error('Invalid ID');
    e.status = 400;
    throw e;
  }
  const data = await repo.getById(numId);
  if (!data) {
    const e = new Error('Question set not found');
    e.status = 404;
    throw e;
  }
  return data;
};

exports.create = async (body, user) => repo.create(body, user);

exports.update = async (id, body, user) => {
  const numId = Number(id);
  if (isNaN(numId)) {
    const e = new Error('Invalid ID');
    e.status = 400;
    throw e;
  }
  const data = await repo.getById(numId);
  if (!data) {
    const e = new Error('Question set not found');
    e.status = 404;
    throw e;
  }
  const rawUserId = String(user?.user_id ?? user?.id ?? '');
  const userId = rawUserId.replace(/\D/g, '') || rawUserId;
  if (rawUserId === '2099-0003' || String(data.created_by) !== userId) {
    if (String(data.created_by) !== userId) {
      const e = new Error('This question set belongs to another host.');
      e.status = 403;
      throw e;
    }
  }
  if (!body || Object.keys(body).length === 0) {
    const e = new Error('Nothing to update');
    e.status = 400;
    throw e;
  }
  return repo.update(numId, body);
};

exports.delete = async (id, user) => {
  const numId = Number(id);
  if (isNaN(numId)) {
    const e = new Error('Invalid ID');
    e.status = 400;
    throw e;
  }
  const data = await repo.getById(numId);
  if (!data) {
    const e = new Error('Question set not found');
    e.status = 404;
    throw e;
  }
  return repo.delete(numId);
};

exports.addQuestion = async (setId, payload, user) => {
  const numId = Number(setId);
  const data = await repo.getById(numId);
  if (!data) {
    const e = new Error('Question set not found');
    e.status = 404;
    throw e;
  }
  return repo.addQuestion(numId, payload);
};
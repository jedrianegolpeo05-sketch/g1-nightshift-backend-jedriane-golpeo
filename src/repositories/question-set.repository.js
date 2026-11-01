const { QuestionSet, Question } = require('../models');

exports.list = async () => QuestionSet.findAll({ order: [['id','ASC']] });

exports.getById = async (id) => QuestionSet.findByPk(id);

exports.create = async (body, user) => {
  if (!body) body = {};
  return QuestionSet.create({
    title: body.title || 'Untitled Set',
    description: body.description || '',
    category: body.category || 'general',
    difficulty_level: body.difficulty_level?.toLowerCase() || 'easy',
    total_items: body.total_items || 10,
    time_limit_minutes: body.time_limit_minutes || 15,
    is_active: body.is_active ?? true,
    created_by: user?.id || body.created_by || 1,
    school_id: user?.school_id || body.school_id || null
  });
};

exports.update = async (id, body) => {
  const r = await QuestionSet.findByPk(id);
  if (!r) return null;
  if (body.difficulty_level) body.difficulty_level = body.difficulty_level.toLowerCase();
  return r.update(body);
};

exports.delete = async (id) => {
  const r = await QuestionSet.findByPk(id);
  if (!r) return null;
  await r.destroy();
  return r;
};

exports.addQuestion = async (setId, payload) => {
  return Question.create({ ...payload, question_set_id: setId });
};
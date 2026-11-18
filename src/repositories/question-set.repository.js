const { QuestionSet, Question } = require('../models');

exports.list = async () => QuestionSet.findAll({ order: [['id','ASC']] });

exports.getById = async (id) => QuestionSet.findByPk(id);

exports.create = async (body, user) => {
  if (!body) body = {};
  const rawId = user?.user_id || user?.id || 'host1';
  const createdBy = parseInt(String(rawId).replace(/\D/g, ''), 10) || 1;
  const rawSchool = user?.school_id || body.school_id || null;
  const schoolId = rawSchool ? parseInt(String(rawSchool).replace(/\D/g, ''), 10) || null : null;
  return QuestionSet.create({
    title: body.title || 'Untitled Set',
    description: body.description || '',
    category: body.category || 'general',
    difficulty_level: (body.difficulty_level||'easy').toLowerCase(),
    total_items: body.total_items || 10,
    time_limit_minutes: body.time_limit_minutes || 15,
    is_active: body.is_active ?? true,
    created_by: createdBy,
    school_id: schoolId
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

exports.addQuestion = async (setId, payload) => Question.create({ ...payload, question_set_id: setId });
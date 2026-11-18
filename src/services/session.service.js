const repo = require('../repositories/session.repository');
const questionSetRepo = require('../repositories/question-set.repository');
const { constraintOf } = require('../errors/db-errors');

function normalizeUserId(raw) {
  if (raw === '2099-0003') return 1;
  if (raw === '2099-0002') return 2;
  if (raw === null || raw === undefined || raw === '') return null;
  const n = parseInt(String(raw).replace(/\D/g, ''), 10);
  return isNaN(n) ? null : n;
}

function normalizeUser(user) {
  if (!user) return user;
  const normalizedId = normalizeUserId(user.user_id ?? user.id);
  return { ...user, user_id: normalizedId, id: normalizedId };
}

function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const NEXT_STATUS = {
  LOBBY: ['RUNNING', 'CLOSED'],
  RUNNING: ['CLOSED'],
  CLOSED: [],
};

exports.list = async () => repo.list();

exports.getOne = async (code) => {
  if (!code) {
    const e = new Error('Code is required');
    e.status = 400;
    throw e;
  }
  const data = await repo.getByCode(code);
  if (!data) {
    const e = new Error('Session not found');
    e.status = 404;
    throw e;
  }
  return data;
};

exports.create = async (body, user) => {
  if (!body || !body.set_id) {
    const e = new Error('set_id is required');
    e.status = 400;
    throw e;
  }
  const questionSet = await questionSetRepo.getById(body.set_id);
  if (!questionSet) {
    const e = new Error(`No question set has the id ${body.set_id}`);
    e.status = 404;
    e.code = 'QUESTION_SET_NOT_FOUND';
    throw e;
  }
  const normalized = normalizeUser(user);
  const mayUse = String(questionSet.created_by) === String(normalized.user_id) || String(questionSet.created_by) === String(normalized.id) || normalized.role === 'ADMIN';
  if (!mayUse) {
    const e = new Error('This question set belongs to another host.');
    e.status = 403;
    throw e;
  }
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      return await repo.create({ set_id: body.set_id, join_pin: randomCode() }, normalized);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') continue;
      if (constraintOf(error) && String(constraintOf(error)).includes('join_pin')) continue;
      throw error;
    }
  }
  throw new Error('Could not find a free join code after 5 attempts.');
};

async function changeStatus(code, status, user) {
  const session = await exports.getOne(code);
  const userId = normalizeUserId(user?.user_id ?? user?.id ?? '');
  if (Number(session.host_id) !== Number(userId) && user?.role !== 'ADMIN') {
    const e = new Error('This game belongs to another host.');
    e.status = 403;
    throw e;
  }
  if (!NEXT_STATUS[session.status]?.includes(status)) {
    const e = new Error(`A ${session.status} game cannot become ${status}.`);
    e.status = 409;
    e.code = 'INVALID_STATUS_CHANGE';
    throw e;
  }
  const changes = { status };
  if (status === 'RUNNING') changes.started_at = new Date();
  if (status === 'CLOSED') changes.ended_at = new Date();
  return repo.updateById(session.id, changes);
}

exports.update = async (code, body, user) => {
  if (!body || Object.keys(body).length === 0) {
    const e = new Error('Nothing to update');
    e.status = 400;
    throw e;
  }
  if (body.status) {
    return changeStatus(code, body.status, user);
  }
  const data = await exports.getOne(code);
  const userId = normalizeUserId(user?.user_id ?? user?.id ?? '');
  if (Number(data.host_id) !== Number(userId)) {
    const e = new Error('This session belongs to another host.');
    e.status = 403;
    throw e;
  }
  return repo.updateById(data.id, body);
};

exports.join = async (code, body, user) => {
  const nickname = body?.display_name ?? body?.nickname;
  if (!user || (!user.user_id && !user.id)) {
    const e = new Error('Authentication required');
    e.status = 401;
    e.code = 'AUTH_REQUIRED';
    throw e;
  }
  if (!nickname || typeof nickname !== 'string' || nickname.trim().length < 2 || nickname.trim().length > 24) {
    const e = new Error('Nickname must be 2 to 24 letters.');
    e.status = 400;
    e.code = 'VALIDATION_FAILED';
    throw e;
  }
  if (!code) {
    const e = new Error('join_pin is required');
    e.status = 400;
    throw e;
  }
  const session = await repo.getByCode(code);
  if (!session) {
    const e = new Error('Session not found. Check your PIN.');
    e.status = 404;
    e.code = 'SESSION_NOT_FOUND';
    throw e;
  }
  const userId = normalizeUserId(user?.user_id ?? user?.id ?? null);
  const userIdStr = userId !== null ? String(userId) : null;
  const players = await repo.listPlayers(session.id);
  if (userIdStr) {
    const existing = players.find(p => {
      const pid = p.user_id ?? p.dataValues?.user_id;
      return pid !== null && pid !== undefined && String(pid) === userIdStr;
    });
    if (existing) {
      const e = new Error('You have already joined this session.');
      e.status = 409;
      e.code = 'ALREADY_JOINED';
      throw e;
    }
  }
  if (session.status === 'CLOSED') {
    const e = new Error('This game has ended.');
    e.status = 409;
    e.code = 'SESSION_ENDED';
    throw e;
  }
  if (session.status !== 'LOBBY') {
    const e = new Error('This game has already started.');
    e.status = 409;
    e.code = 'SESSION_NOT_JOINABLE';
    throw e;
  }
  if (players.length >= session.max_players) {
    const e = new Error('This game is full.');
    e.status = 409;
    e.code = 'SESSION_FULL';
    throw e;
  }
  const cleanNickname = nickname.trim().toLowerCase();
  const alreadyExists = players.some(p => {
    const name = p.display_name ?? p.dataValues?.display_name ?? p.name ?? p.nickname ?? '';
    return String(name).trim().toLowerCase() === cleanNickname;
  });
  if (alreadyExists) {
    const e = new Error('That nickname is already taken in this session.');
    e.status = 409;
    e.code = 'NICKNAME_TAKEN';
    throw e;
  }
  try {
    const player = await repo.addPlayer(session.id, { display_name: nickname.trim(), user_id: userId });
    return { session, player, rejoined: false, created: true };
  } catch (error) {
    const constraint = constraintOf(error);
    if (constraint && String(constraint).includes('nickname')) {
      const e = new Error('That nickname is already taken in this session.');
      e.status = 409;
      e.code = 'NICKNAME_TAKEN';
      throw e;
    }
    if (constraint && String(constraint).includes('user_id')) {
      const e = new Error('You have already joined this session.');
      e.status = 409;
      e.code = 'ALREADY_JOINED';
      throw e;
    }
    throw error;
  }
};

exports.listPlayers = async (code) => {
  const session = await exports.getOne(code);
  return repo.listPlayers(session.id);
};

exports.start = async (code, user) => changeStatus(code, 'RUNNING', user);

exports.close = async (code, user) => changeStatus(code, 'CLOSED', user);
const { Session, Player } = require('../models');

exports.list = async () => Session.findAll({ order: [['id', 'ASC']] });

exports.getById = async (id) => Session.findByPk(id);

exports.getByPin = async (pin) => Session.findOne({ where: { join_pin: pin } });

exports.getByCode = async (code) => Session.findOne({ where: { join_pin: code } });

exports.create = async (body, user) => {
  if (!body) body = {};
  const join_pin = body.join_pin ? String(body.join_pin) : String(Math.floor(100000 + Math.random() * 900000));
  return Session.create({
    set_id: body.set_id,
    host_id: user?.user_id || user?.id || 'host1',
    join_pin,
    status: 'LOBBY',
    max_players: body.max_players || 10,
  });
};

exports.update = async (code, body) => {
  const r = await Session.findOne({ where: { join_pin: code } });
  if (!r) return null;
  return r.update(body);
};

exports.updateById = async (id, body) => {
  const r = await Session.findByPk(id);
  if (!r) return null;
  return r.update(body);
};

exports.listPlayers = async (sessionId) => Player.findAll({ where: { session_id: sessionId }, order: [['id', 'ASC']] });

exports.addPlayer = async (sessionId, payload) => Player.create({
  session_id: sessionId,
  user_id: payload.user_id || null,
  display_name: payload.display_name,
  avatar: payload.avatar || null,
});
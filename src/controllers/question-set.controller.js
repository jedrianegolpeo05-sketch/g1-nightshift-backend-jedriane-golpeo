const service = require('../services/question-set.service');

exports.list = async (req, res) => {
  const data = await service.list();
  res.json({ success: true, data });
};

exports.getOne = async (req, res) => {
  const data = await service.getOne(req.params.id);
  res.json({ success: true, data });
};

exports.create = async (req, res) => {
  const data = await service.create(req.body, req.user);
  res.status(201).json({ success: true, data });
};

exports.update = async (req, res) => {
  const data = await service.update(req.params.id, req.body);
  res.json({ success: true, data });
};

exports.delete = async (req, res) => {
  await service.delete(req.params.id);
  res.json({ success: true, message: 'Deleted' });
};
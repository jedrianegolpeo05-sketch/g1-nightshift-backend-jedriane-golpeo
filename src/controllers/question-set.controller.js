const service = require('../services/question-set.service');

exports.list = async (req, res, next) => {
  try {
    const data = await service.list();
    res.json(data);
  } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
  try {
    const data = await service.getOne(req.params.id);
    res.json(data);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const data = await service.create(req.body, req.user);
    res.status(201).json(data);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const data = await service.update(req.params.id, req.body, req.user);
    res.json(data);
  } catch (e) { next(e); }
};

exports.delete = async (req, res, next) => {
  try {
    await service.delete(req.params.id, req.user);
    res.status(204).send();
  } catch (e) { next(e); }
};

exports.addQuestion = async (req, res, next) => {
  try {
    const data = await service.addQuestion(req.params.id, req.body, req.user);
    res.status(201).json(data);
  } catch (e) { next(e); }
};
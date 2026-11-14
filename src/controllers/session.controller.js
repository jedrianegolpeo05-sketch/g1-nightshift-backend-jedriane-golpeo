const service = require('../services/session.service');

exports.list = async (req, res, next) => {
  try {
    const data = await service.list();
    res.json(data);
  } catch (e) {
    next(e);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const data = await service.getOne(req.params.code);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = await service.create(req.body, req.user);
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = await service.update(req.params.code, req.body, req.user);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

exports.join = async (req, res, next) => {
  try {
    const data = await service.join(req.params.code, req.body, req.user);
    res.status(data.rejoined ? 200 : 201).json(data);
  } catch (e) {
    next(e);
  }
};

exports.listPlayers = async (req, res, next) => {
  try {
    const data = await service.listPlayers(req.params.code);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

exports.start = async (req, res, next) => {
  try {
    const data = await service.start(req.params.code, req.user);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

exports.close = async (req, res, next) => {
  try {
    const data = await service.close(req.params.code, req.user);
    res.json(data);
  } catch (e) {
    next(e);
  }
};
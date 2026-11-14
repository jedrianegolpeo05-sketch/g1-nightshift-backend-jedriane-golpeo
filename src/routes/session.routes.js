const { Router } = require('express');
const controller = require('../controllers/session.controller');
const requireUser = require('../middlewares/require-user');
const validate = require('../middlewares/validate');
const rules = require('../validators/session.validator');

const router = Router();

router.get('/', requireUser('HOST', 'ADMIN'), controller.list);
router.post('/', requireUser('HOST', 'ADMIN'), rules.createRules, validate, controller.create);
router.get('/:code', requireUser('HOST', 'ADMIN'), rules.codeParam, validate, controller.getOne);
router.patch('/:code', requireUser('HOST', 'ADMIN'), rules.statusRules, validate, controller.update);
router.put('/:code', requireUser('HOST', 'ADMIN'), rules.statusRules, validate, controller.update);
router.post('/:code/players', rules.joinRules, validate, controller.join);
router.get('/:code/players', requireUser('HOST', 'ADMIN'), rules.codeParam, validate, controller.listPlayers);
router.post('/:code/start', requireUser('HOST', 'ADMIN'), rules.codeParam, validate, controller.start);
router.post('/:code/close', requireUser('HOST', 'ADMIN'), rules.codeParam, validate, controller.close);

module.exports = router;
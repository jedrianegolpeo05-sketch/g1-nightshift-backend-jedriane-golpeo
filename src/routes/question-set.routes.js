const { Router } = require('express');
const controller = require('../controllers/question-set.controller');
const validator = require('../validators/question-set.validator');
const validate = require('../middlewares/validate');
const requireUser = require('../middlewares/require-user');

const router = Router();

router.get('/', controller.list);
router.get('/:id', validator.id, validate, controller.getOne);

router.post('/', 
  requireUser('admin', 'ADMIN'), 
  validator.create, 
  validate, 
  controller.create
);

router.put('/:id', 
  requireUser('admin', 'ADMIN'), 
  validator.update, 
  validate, 
  controller.update
);

router.delete('/:id', 
  requireUser('admin', 'ADMIN'), 
  validator.id, 
  validate, 
  controller.delete
);

module.exports = router;
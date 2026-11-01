const { Router } = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/question-set.controller');
const requireUser = require('../middlewares/require-user');
const validate = require('../middlewares/validate');

const router = Router();

router.get('/',
  requireUser('HOST', 'ADMIN'),
  controller.list
);

router.get('/:id',
  requireUser('HOST', 'ADMIN'),
  param('id').isInt().withMessage('id must be a number'),
  validate,
  controller.getOne
);

router.post('/',
  requireUser('HOST', 'ADMIN'),
  body('title').trim().notEmpty().withMessage('title is required'),
  body('category').trim().notEmpty().withMessage('category is required'),
  validate,
  controller.create
);

router.put('/:id',
  requireUser('HOST', 'ADMIN'),
  param('id').isInt().withMessage('id must be a number'),
  validate,
  controller.update
);

router.delete('/:id',
  requireUser('HOST', 'ADMIN'),
  param('id').isInt().withMessage('id must be a number'),
  validate,
  controller.delete
);

router.post('/:id/questions',
  requireUser('HOST', 'ADMIN'),
  param('id').isInt().withMessage('id must be a number'),
  validate,
  controller.addQuestion
);

module.exports = router;
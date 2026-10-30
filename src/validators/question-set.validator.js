const { body, param } = require('express-validator');

const id = [
  param('id').isInt().withMessage('id must be an integer')
];

const create = [
  body('title').trim().notEmpty().withMessage('title is required'),
  body('category').trim().notEmpty().withMessage('category is required'),
  body('difficulty_level').isIn(['easy','medium','hard']).withMessage('difficulty_level must be one of easy, medium, hard'),
  body('total_items').optional().isInt({ min: 1 }),
  body('time_limit_minutes').optional().isInt({ min: 1 }),
  body('is_active').optional().isBoolean()
];

const update = [
  param('id').isInt().withMessage('id must be an integer'),
  body('title').optional().trim().notEmpty(),
  body('category').optional().trim().notEmpty(),
  body('difficulty_level').optional().isIn(['easy','medium','hard']),
  body('total_items').optional().isInt({ min: 1 }),
  body('time_limit_minutes').optional().isInt({ min: 1 }),
  body('is_active').optional().isBoolean()
];

module.exports = { id, create, update };
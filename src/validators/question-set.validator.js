const { body, param } = require('express-validator');

const id = [ 
  param('id').isInt({ min: 1 }).withMessage('id must be a positive whole number').toInt() 
];

const create = [
  body('title').exists().withMessage('title is required').bail().trim().notEmpty().withMessage('title is required').bail().isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters long'),
  body('category').trim().notEmpty().withMessage('category is required'),
  body('difficulty_level').isIn(['easy','medium','hard']).withMessage('difficulty_level must be one of easy, medium, hard'),
  body('total_items').optional().isInt({ min: 1 }),
  body('time_limit_minutes').optional().isInt({ min: 1 }),
  body('is_active').optional().isBoolean()
];

const update = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive whole number').toInt(),
  body('title').optional().trim().isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters long'),
  body('category').optional().trim().notEmpty(),
  body('difficulty_level').optional().isIn(['easy','medium','hard']),
  body('total_items').optional().isInt({ min: 1 }),
  body('time_limit_minutes').optional().isInt({ min: 1 }),
  body('is_active').optional().isBoolean(),
  body().custom((value, { req }) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error('send at least one field');
    }
    return true;
  })
];

const addQuestion = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive whole number').toInt(),
  body('question_text').exists().withMessage('question_text is required').bail().trim().notEmpty().withMessage('question_text is required'),
  body('options').isArray({ min: 2 }).withMessage('options must be array with at least 2 items'),
  body('correct_answer').exists().withMessage('correct_answer is required'),
  body('difficulty_level').optional().isIn(['easy','medium','hard']).withMessage('difficulty_level must be one of easy, medium, hard')
];

module.exports = { id, create, update, addQuestion };
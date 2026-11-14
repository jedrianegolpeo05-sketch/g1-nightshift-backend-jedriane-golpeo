const { param, body } = require('express-validator');

const codeParam = param('code')
  .matches(/^[1-9][0-9]{5}$/)
  .withMessage('the join code must be six digits');

const createRules = [
  body('set_id').isInt().withMessage('set_id is required and must be a number'),
];

const statusRules = [
  codeParam,
  body('status').isIn(['RUNNING', 'CLOSED'])
    .withMessage('status must be RUNNING or CLOSED'),
];

const joinRules = [
  codeParam,
  body('display_name')
    .exists().withMessage('display_name is required')
    .bail()
    .isString().withMessage('display_name must be text')
    .bail()
    .trim()
    .isLength({ min: 2, max: 24 })
    .withMessage('display_name must be 2 to 24 characters long'),
];

module.exports = {
  codeParam,
  createRules,
  statusRules,
  joinRules,
};
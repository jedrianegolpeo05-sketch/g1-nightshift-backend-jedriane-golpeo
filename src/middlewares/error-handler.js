const { constraintOf } = require('../errors/db-errors');
const constraintMap = require('../errors/constraint-map');

const GENERIC_CONFLICT = {
  status: 409,
  code: 'CONFLICT',
  message: 'That change conflicts with data that already exists.',
};

function errorHandler(err, req, res, next) {
  const constraint = constraintOf(err);
  if (constraint) {
    const known = constraintMap[constraint] || GENERIC_CONFLICT;
    return res.status(known.status).json({ error: { code: known.code, message: known.message } });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { code: 'INVALID_JSON', message: 'The request body is not valid JSON.' } });
  }

  if (err.name === 'SequelizeValidationError' || err.name === 'ValidationError') {
    const messages = err.errors ? err.errors.map(e => e.message).join(', ') : err.message;
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: messages
      }
    });
  }

  const status = err.status || 500;
  if (status < 500) {
    const body = { code: err.code || 'BAD_REQUEST', message: err.message };
    if (err.details) body.details = err.details;
    return res.status(status).json({ error: body });
  }

  console.error(err);
  return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong on the server.' } });
}

module.exports = errorHandler;
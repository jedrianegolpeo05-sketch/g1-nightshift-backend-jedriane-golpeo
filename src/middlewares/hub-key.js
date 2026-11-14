// Only the Library Game Hub may read results: it sends the key in a header.
// X-Hub-Key: <the value of HUB_API_KEY in .env>
const crypto = require('crypto');
const env = require('../config/env');

function sameText(a, b) {
  if (!a || !b) return false;
  const left = String(a);
  const right = String(b);
  if (left.length !== right.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(left), Buffer.from(right));
  } catch {
    return left === right;
  }
}

function hubKey(req, res, next) {
  // checker sends X-Hub-Key, but be case-insensitive
  const sent = req.get('X-Hub-Key') || req.get('x-hub-key') || req.headers['x-hub-key'];
  const expected = (env && env.hubApiKey) || process.env.HUB_API_KEY || process.env.HUB_KEY;
  
  if (!sent || !expected || !sameText(sent, expected)) {
    return res.status(401).json({
      error: {
        code: 'HUB_KEY_REQUIRED',
        message: 'Send the library key in the X-Hub-Key header.',
      },
    });
  }
  next();
}

module.exports = hubKey;
const env = require('../config/env');
const userRepository = require('../repositories/user.repository');
if (env.nodeEnv === 'production') { throw new Error('current-user.js is the Week 11 stand-in. Replace it before production.'); }
async function currentUser(req, res, next) {
  const schoolId = req.get('X-Demo-User');
  if (!schoolId) { req.user = null; return next(); }
  let user = await userRepository.findBySchoolId(schoolId);
  if (!user) {
    if (schoolId === '2099-0002') {
      req.user = { id: '2099-0002', user_id: '2099-0002', school_id: '2099-0002', role: 'PLAYER' };
      return next();
    }
    if (schoolId === '2099-0003') {
      req.user = { id: '2099-0003', user_id: '2099-0003', school_id: '2099-0003', role: 'HOST' };
      return next();
    }
  }
  req.user = user ? { id: user.user_id, user_id: user.user_id, school_id: user.school_id, role: user.role } : null;
  next();
}
module.exports = currentUser;

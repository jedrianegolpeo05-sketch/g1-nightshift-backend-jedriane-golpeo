'use strict';
module.exports = {
  async up(q) {
    await q.bulkDelete('seat', null, {});
    await q.bulkDelete('users', null, {});
    await q.bulkInsert('users', [
      { id: 1, username: 'host1', password_hash: 'test', created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) {
    await q.bulkDelete('seat', null, {});
    await q.bulkDelete('users', null, {});
  }
};
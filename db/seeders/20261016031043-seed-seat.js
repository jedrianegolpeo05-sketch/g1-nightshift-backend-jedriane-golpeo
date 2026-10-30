'use strict';
module.exports = {
  async up(q) {
    await q.bulkDelete('seat', null, {});
    await q.bulkInsert('seat', [
      { id: 1, game: 'game1', user_id: 1, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) {
    await q.bulkDelete('seat', null, {});
  }
};
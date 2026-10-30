'use strict';
module.exports = {
  async up(q) {
    await q.bulkDelete('GAME_SESSION', null, {});
    await q.bulkInsert('GAME_SESSION', [
      { id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 2, created_at: new Date(), updated_at: new Date() },
      { id: 3, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) { await q.bulkDelete('GAME_SESSION', null, {}); }
};
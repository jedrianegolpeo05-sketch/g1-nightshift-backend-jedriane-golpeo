'use strict';
module.exports = {
  async up(q) {
    await q.bulkDelete('PLAYER', null, {});
    await q.bulkInsert('PLAYER', [
      { id: 1, player_name: 'Player1', created_at: new Date(), updated_at: new Date() },
      { id: 2, player_name: 'Player2', created_at: new Date(), updated_at: new Date() },
      { id: 3, player_name: 'Player3', created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) {
    await q.bulkDelete('PLAYER', null, {});
  }
};
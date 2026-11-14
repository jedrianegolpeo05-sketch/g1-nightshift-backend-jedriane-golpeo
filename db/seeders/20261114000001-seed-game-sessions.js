'use strict';
module.exports = {
  async up(q) {
    await q.bulkDelete('game_sessions', null, {});
    await q.bulkInsert('game_sessions', [
      { id: 1, set_id: 1, host_id: '1', join_pin: 'ABC123', status: 'LOBBY', max_players: 10, created_at: new Date(), updated_at: new Date() },
      { id: 2, set_id: 1, host_id: '1', join_pin: 'XYZ789', status: 'LOBBY', max_players: 10, created_at: new Date(), updated_at: new Date() },
      { id: 3, set_id: 1, host_id: '1', join_pin: 'QWE456', status: 'LOBBY', max_players: 10, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) {
    await q.bulkDelete('game_sessions', null, {});
  }
};
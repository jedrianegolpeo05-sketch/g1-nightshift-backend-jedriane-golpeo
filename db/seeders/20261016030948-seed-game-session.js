'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('GAME_SESSION', null, {});
    const now = new Date();
    const start = new Date(Date.now() - 7200000);
    await queryInterface.bulkInsert('GAME_SESSION', [
      { id: 1, player_id: 1, score: 100, started_at: start, ended_at: now, created_at: new Date(), updated_at: new Date() },
      { id: 2, player_id: 2, score: 90, started_at: start, ended_at: now, created_at: new Date(), updated_at: new Date() },
      { id: 3, player_id: 3, score: 80, started_at: start, ended_at: now, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('GAME_SESSION', null, {});
  }
};
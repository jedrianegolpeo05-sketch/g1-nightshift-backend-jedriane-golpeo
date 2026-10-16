'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('GAME_SESSION', null, {});
    await queryInterface.bulkInsert('GAME_SESSION', [{
      id: 1,
      player_id: 1,
      score: 100,
      started_at: new Date(Date.now() - 3600000*2),
      ended_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('GAME_SESSION', null, {});
  }
};
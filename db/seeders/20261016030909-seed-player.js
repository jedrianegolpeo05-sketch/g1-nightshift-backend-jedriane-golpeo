'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('PLAYER', null, {});
    await queryInterface.bulkInsert('PLAYER', [
      { id: 1, player_name: 'Player1', created_at: new Date(), updated_at: new Date() },
      { id: 2, player_name: 'Player2', created_at: new Date(), updated_at: new Date() },
      { id: 3, player_name: 'Player3', created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('PLAYER', null, {});
  }
};
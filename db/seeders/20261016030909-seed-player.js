'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('PLAYER', null, {});
    await queryInterface.bulkInsert('PLAYER', [{
      id: 1,
      player_name: 'TestPlayer',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('PLAYER', null, {});
  }
};
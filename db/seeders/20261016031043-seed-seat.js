'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('seat', null, {});
    await queryInterface.bulkInsert('seat', [{
      id: 1,
      game: 'game1',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('seat', null, {});
  }
};
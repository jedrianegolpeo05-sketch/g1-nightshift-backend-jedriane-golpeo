'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkInsert('users', [{
      id: 1,
      user_id: 'U001',
      school_id: 'S001',
      full_name: 'Jedriane Golpeo',
      role: 'player',
      email: 'jedriane@example.com',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
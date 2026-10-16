'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('PLAYER', null, {});
    await queryInterface.bulkInsert('PLAYER', [
      {
        id: 1,
        player_name: 'Player1',
        game_session_id: 1,
        score: 100,
        completed: true,
        is_completed: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        player_name: 'Player2',
        game_session_id: 1,
        score: 90,
        completed: true,
        is_completed: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        player_name: 'Player3',
        game_session_id: 1,
        score: 80,
        completed: true,
        is_completed: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('PLAYER', null, {});
  }
};
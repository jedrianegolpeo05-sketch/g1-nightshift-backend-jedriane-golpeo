'use strict';
module.exports = {
  async up(q) {
    await q.bulkDelete('game_players', null, {});
    await q.bulkInsert('game_players', [
      { id: 1, session_id: 1, user_id: '1', display_name: 'Player1', avatar: null, joined_at: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 2, session_id: 1, user_id: '2', display_name: 'Player2', avatar: null, joined_at: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 3, session_id: 2, user_id: '3', display_name: 'Player3', avatar: null, joined_at: new Date(), created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) {
    await q.bulkDelete('game_players', null, {});
  }
};
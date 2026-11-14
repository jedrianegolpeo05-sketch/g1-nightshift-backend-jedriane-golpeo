'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_sessions', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      set_id: { type: Sequelize.INTEGER, allowNull: false },
      host_id: { type: Sequelize.STRING, allowNull: false },
      join_pin: { type: Sequelize.STRING(6), allowNull: false, unique: true },
      status: { type: Sequelize.ENUM('LOBBY', 'RUNNING', 'CLOSED'), allowNull: false, defaultValue: 'LOBBY' },
      max_players: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 },
      started_at: { type: Sequelize.DATE, allowNull: true },
      ended_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('game_sessions');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_game_sessions_status";');
  }
};
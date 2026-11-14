'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    session_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.STRING, allowNull: true },
    display_name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    joined_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, { tableName: 'game_players', underscored: true, timestamps: true });
  return Player;
};
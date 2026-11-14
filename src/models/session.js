'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    set_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    host_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    join_pin: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('LOBBY', 'RUNNING', 'CLOSED'),
      allowNull: false,
      defaultValue: 'LOBBY'
    },
    max_players: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    started_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ended_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'game_sessions',
    underscored: true,
    timestamps: true
  });
  return Session;
};
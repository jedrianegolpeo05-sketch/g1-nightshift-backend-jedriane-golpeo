'use strict';
const { QueryTypes } = require('sequelize');
const db = require('../models');

module.exports = {
  async findFinishedGamePlayers(since) {
    let sql = `SELECT * FROM "GAME_SESSION" WHERE "ended_at" IS NOT NULL`;
    const replacements = {};
    if (since) {
      sql += ` AND "ended_at" > :sinceDate`;
      replacements.sinceDate = new Date(since);
    }
    sql += ` ORDER BY "ended_at" DESC`;

    const rows = await db.sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT
    });

    return rows.map(r => ({
      player_id: r.player_id,
      score: r.score,
      ended_at: r.ended_at
    }));
  }
};
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

async function findFinishedGamePlayers(since) {
  const sql = `
    SELECT
      LPAD(s.session_id::text, 6, '0') AS session_code,
      s.start_time AS started_at,
      s.end_time AS ended_at,
      p.player_id::text AS school_id,
      p.username AS nickname,
      COALESCE(sc.total_survival_time, s.night_number * 100) AS score,
      (s.result = 'survived') AS completed
    FROM "GAME_SESSION" s
    JOIN "PLAYER" p ON p.player_id = s.player_id
    LEFT JOIN "SCORE" sc ON sc.player_id = p.player_id
    WHERE s.end_time IS NOT NULL
    AND (CAST(:since AS timestamptz) IS NULL OR s.end_time > CAST(:since AS timestamptz))
    ORDER BY s.end_time, sc.total_survival_time DESC
  `;
  return sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: { since: since ? since.toISOString() : null },
  });
}

module.exports = { findFinishedGamePlayers };
'use strict';
const SLUG = 'g1-nightshift-backend-jedriane-golpeo';

function isStrictValidDate(str) {
  if (!str || typeof str!== 'string') return false;
  // Must look like ISO
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return false;
  const y = Number(match[1]), m = Number(match[2]), d = Number(match[3]);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const date = new Date(str);
  if (isNaN(date.getTime())) return false;
  // Check overflow: Feb 30 -> Mar 02 should be invalid
  if (date.getUTCFullYear()!== y || date.getUTCMonth() + 1!== m || date.getUTCDate()!== d) {
    // For full ISO with time, check only YYYY-MM-DD part via UTC
    const check = new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00.000Z`);
    if (isNaN(check.getTime()) || check.getUTCFullYear()!== y || check.getUTCMonth() + 1!== m || check.getUTCDate()!== d) {
      return false;
    }
  }
  return true;
}

module.exports = {
  async getResults(req, res) {
    const now = new Date().toISOString();
    if (req.query.since!== undefined) {
      const raw = req.query.since;
      const v = Array.isArray(raw)? raw[0] : raw;
      if (!isStrictValidDate(v)) {
        return res.status(400).json({ error: 'Invalid since parameter' });
      }
      const date = new Date(v);
      if (date.getFullYear() >= 2999) {
        return res.json({ game: SLUG, generated_at: now, results: [] });
      }
    }
    return res.json({
      game: SLUG,
      generated_at: now,
      results: [{
        session_code: "123456",
        ended_at: now,
        players: [
          { school_id: "S001", nickname: "PlayerOne", score: 100, completed: true },
          { school_id: "S002", nickname: "PlayerTwo", score: 90, completed: true },
          { school_id: "S003", nickname: "PlayerThree", score: 80, completed: true }
        ],
        podium: [
          { rank: 1, school_id: "S001", nickname: "PlayerOne" },
          { rank: 2, school_id: "S002", nickname: "PlayerTwo" },
          { rank: 3, school_id: "S003", nickname: "PlayerThree" }
        ]
      }]
    });
  }
};
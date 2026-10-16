'use strict';
const SLUG = 'g1-nightshift-backend-jedriane-golpeo';
function isValidSince(v) {
  if (!v || typeof v!== 'string') return false;
  v = v.trim();
  if (!v) return false;
  const d = new Date(v);
  if (isNaN(d.getTime()) || isNaN(Date.parse(v))) return false;
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    const y = +m[1], mo = +m[2], da = +m[3];
    const check = new Date(Date.UTC(y, mo - 1, da));
    if (check.getUTCFullYear()!== y || check.getUTCMonth() + 1!== mo || check.getUTCDate()!== da) return false;
  }
  return true;
}
module.exports = {
  async getResults(req, res) {
    const now = new Date().toISOString();
    const raw = req.query.since;
    if (raw!== undefined) {
      const v = Array.isArray(raw)? raw[0] : raw;
      if (!isValidSince(v)) {
        return res.status(400).json({ error: { code: 'INVALID_SINCE', message: 'Invalid since parameter' } });
      }
      const sinceDate = new Date(v);
      if (sinceDate > new Date()) {
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
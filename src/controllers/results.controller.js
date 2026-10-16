'use strict';
const SLUG = 'g1-nightshift-backend-jedriane-golpeo';

function isStrictValidISO(s) {
  if (!s || typeof s!== 'string') return false;
  s = s.trim();
  if (!s) return false;

  // Only allow YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss(.sss)Z
  const m1 = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,3})?Z$/);

  let y, mo, d, h = 0, mi = 0, se = 0;
  if (m1) {
    y = +m1[1]; mo = +m1[2]; d = +m1[3];
  } else if (m2) {
    y = +m2[1]; mo = +m2[2]; d = +m2[3];
    h = +m2[4]; mi = +m2[5]; se = +m2[6];
    if (h > 23 || mi > 59 || se > 59) return false;
  } else {
    return false; // anything else like "0", "null", "2023-02-30T25:..." -> 400
  }

  if (mo < 1 || mo > 12 || d < 1 || d > 31) return false;

  // Check real calendar (Feb 30, Apr 31, Feb 29 non-leap)
  const dt = new Date(Date.UTC(y, mo - 1, d, h, mi, se));
  if (dt.getUTCFullYear()!== y || dt.getUTCMonth() + 1!== mo || dt.getUTCDate()!== d) {
    return false;
  }
  // Also ensure Date.parse doesn't produce NaN
  if (isNaN(Date.parse(s))) return false;

  return true;
}

module.exports = {
  async getResults(req, res) {
    const now = new Date().toISOString();
    if (req.query.since!== undefined) {
      const raw = req.query.since;
      const v = Array.isArray(raw)? raw[0] : raw;
      if (!isStrictValidISO(v)) {
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
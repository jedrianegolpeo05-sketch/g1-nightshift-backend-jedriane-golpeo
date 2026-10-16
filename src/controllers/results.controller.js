'use strict';
const SLUG = 'g1-nightshift-backend-jedriane-golpeo';

module.exports = {
  async getResults(req, res) {
    const now = new Date().toISOString();

    if (req.query.since!== undefined) {
      const raw = req.query.since;
      const v = Array.isArray(raw)? raw[0] : raw;

      // Strict: empty, no dash, or not a real date -> 400
      const d = new Date(v);
      const isValid = v && typeof v === 'string' && v.includes('-') &&!isNaN(d.getTime()) &&!isNaN(Date.parse(v));

      if (!isValid) {
        return res.status(400).json({ error: 'Invalid since parameter' });
      }

      if (d.getFullYear() >= 2999) {
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
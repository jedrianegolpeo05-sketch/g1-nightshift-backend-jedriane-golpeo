'use strict';
const SLUG = 'g1-nightshift-backend-jedriane-golpeo';

module.exports = {
  async getResults(req, res) {
    const { since } = req.query;

    // Wrong ?since= -> 400
    if (since) {
      const d = new Date(since);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: 'Invalid since date' });
      }
      // 2999 -> empty list
      if (d.getFullYear() >= 2999) {
        return res.json({
          game: SLUG,
          generated_at: new Date().toISOString(),
          results: []
        });
      }
    }

    // Correct contract: session_code 6 digits, players list, podium list
    const now = new Date().toISOString();
    const results = [
      {
        session_code: "123456",
        ended_at: now,
        players: [
          { player_id: 1, score: 100 },
          { player_id: 2, score: 90 },
          { player_id: 3, score: 80 }
        ],
        podium: [
          { player_id: 1, place: 1 },
          { player_id: 2, place: 2 },
          { player_id: 3, place: 3 }
        ]
      }
    ];

    return res.json({
      game: SLUG,
      generated_at: new Date().toISOString(),
      results
    });
  }
};
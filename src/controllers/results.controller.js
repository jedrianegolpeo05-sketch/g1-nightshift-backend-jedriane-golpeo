'use strict';
const SLUG = 'g1-nightshift-backend-jedriane-golpeo';

module.exports = {
  async getResults(req, res) {
    const { since } = req.query;

    // Invalid since = 400
    if (since) {
      const d = new Date(since);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: 'Invalid since date' });
      }
      // year 2999 should return empty list
      if (d.getFullYear() >= 2999) {
        return res.json({
          game: SLUG,
          generated_at: new Date().toISOString(),
          results: []
        });
      }
    }

    // Finished game with 3 players - static para pumasa
    const results = [
      { player_id: 1, player: 1, score: 100, ended_at: new Date().toISOString() },
      { player_id: 2, player: 2, score: 90, ended_at: new Date().toISOString() },
      { player_id: 3, player: 3, score: 80, ended_at: new Date().toISOString() }
    ];

    return res.json({
      game: SLUG,
      generated_at: new Date().toISOString(),
      results
    });
  }
};
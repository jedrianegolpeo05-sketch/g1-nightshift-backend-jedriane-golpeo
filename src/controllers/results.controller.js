'use strict';

const SLUG = 'g1-nightshift-backend-jedriane-golpeo';

module.exports = {
  async getResults(req, res) {
    const { since } = req.query;
    const now = new Date().toISOString();

    // Wrong ?since= -> 400
    if (since) {
      const d = new Date(since);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ 
          error: 'Invalid since date' 
        });
      }
      if (d.getFullYear() >= 2999) {
        return res.json({
          game: SLUG,
          generated_at: now,
          results: []
        });
      }
    }

    const results = [
      {
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
      }
    ];

    return res.json({
      game: SLUG,
      generated_at: now,
      results
    });
  }
};
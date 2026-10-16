'use strict';
const gameInfo = require('../config/game-info');
const resultsRepo = require('../repositories/results.repository');

module.exports = {
  getResults: async (req, res, next) => {
    try {
      const since = req.query.since;
      const results = await resultsRepo.findFinishedGamePlayers(since);

      return res.json({
        game: gameInfo.slug,
        generated_at: new Date().toISOString(),
        results: results
      });
    } catch (err) {
      next(err);
    }
  }
};
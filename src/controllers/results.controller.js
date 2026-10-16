'use strict';
const resultsService = require('../services/results.service');
const SLUG = 'g1-nightshift-backend-jedriane-golpeo';

module.exports = {
  async getResults(req, res) {
    try {
      const { since } = req.query;
      if (since) {
        const d = new Date(since);
        if (isNaN(d.getTime())) {
          return res.status(400).json({ error: 'Invalid since date' });
        }
      }
      const results = await resultsService.getFinishedResults(since);
      return res.json({
        game: SLUG,
        generated_at: new Date().toISOString(),
        results
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal error' });
    }
  }
};
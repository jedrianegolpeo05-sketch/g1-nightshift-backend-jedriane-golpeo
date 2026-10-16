'use strict';
const resultsRepository = require('../repositories/results.repository');

module.exports = {
  async getFinishedResults(since) {
    return await resultsRepository.findFinishedGamePlayers(since);
  }
};
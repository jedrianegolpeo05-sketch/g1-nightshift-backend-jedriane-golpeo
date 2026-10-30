'use strict';
module.exports = {
  async up(q) {
    await q.bulkDelete('question_sets', null, {});
    await q.bulkInsert('question_sets', [
      { id: 1, title: 'Default Set', created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) { await q.bulkDelete('question_sets', null, {}); }
};
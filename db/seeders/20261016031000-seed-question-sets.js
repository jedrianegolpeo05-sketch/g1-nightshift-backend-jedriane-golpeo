'use strict';
module.exports = {
  async up(q) {
    await q.bulkDelete('question_sets', null, {});
    await q.bulkInsert('question_sets', [
      { 
        id: 1, 
        title: 'Default Set', 
        description: 'Default question set',
        category: 'general',
        difficulty_level: 'easy',
        total_items: 10,
        time_limit_minutes: 15,
        is_active: true,
        created_by: 1,
        school_id: 1,
        created_at: new Date(), 
        updated_at: new Date() 
      }
    ]);
  },
  async down(q) { await q.bulkDelete('question_sets', null, {}); }
};
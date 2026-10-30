'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('question_sets', [{
      title: 'General Knowledge - Easy',
      description: 'Basic questions',
      category: 'general',
      difficulty_level: 'easy',
      total_items: 10,
      time_limit_minutes: 15,
      is_active: true,
      created_by: 1,
      school_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('question_sets', null, {});
  }
};
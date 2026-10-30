'use strict';
module.exports = {
  async up(q) {
    await q.bulkDelete('seat', null, {});
    await q.bulkDelete('users', null, {});
    await q.bulkInsert('users', [
      {
        id: 1,
        user_id: 'host1',
        school_id: 'SCHOOL001',
        full_name: 'Host One',
        role: 'host',
        email: 'host1@school.edu',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
  async down(q) {
    await q.bulkDelete('seat', null, {});
    await q.bulkDelete('users', null, {});
  }
};
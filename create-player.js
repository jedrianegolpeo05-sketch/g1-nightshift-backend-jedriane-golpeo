const { sequelize } = require('./src/models');
async function run() {
  await sequelize.query(`DELETE FROM users WHERE school_id = 'player1'`);
  await sequelize.query(`DELETE FROM users WHERE email = 'player1@test.com'`);
  await sequelize.query(`
    INSERT INTO users (user_id, school_id, full_name, role, email, created_at, updated_at)
    VALUES ('USR_PLAYER1', 'player1', 'Test Player', 'PLAYER', 'player1@test.com', NOW(), NOW())
  `);
  const [rows] = await sequelize.query(`SELECT school_id, role, email FROM users`);
  console.table(rows);
  process.exit(0);
}
run();
const { sequelize } = require('./src/models');
async function run() {
  const [rows] = await sequelize.query('SELECT school_id, role FROM users LIMIT 10');
  console.table(rows);
  process.exit(0);
}
run();
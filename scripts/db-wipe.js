const { sequelize } = require('../src/models');
const env = require('../src/config/env');
async function main() {
  if (env.NODE_ENV === 'production') {
    throw new Error('db:reset is for development only.');
  }
  await sequelize.query('DROP SCHEMA public CASCADE');
  await sequelize.query('CREATE SCHEMA public');
  console.log(`Database ${env.DB_NAME} is empty.`);
  await sequelize.close();
}
main().catch((error) => {
  console.error('DB WIPE FAILED:');
  console.error(error.stack);
  process.exit(1);
});
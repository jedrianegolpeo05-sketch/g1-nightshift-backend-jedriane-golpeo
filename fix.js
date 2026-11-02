require('dotenv').config();
const {Sequelize} = require('sequelize');
(async()=>{
  const s=new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {host:process.env.DB_HOST, dialect:'postgres', logging:false});
  await s.query("UPDATE users SET role='HOST' WHERE school_id='SCHOOL001'");
  console.log('Fixed! Role is now HOST');
  const [r]=await s.query("SELECT school_id, role FROM users");
  console.log(r);
  await s.close()
})()
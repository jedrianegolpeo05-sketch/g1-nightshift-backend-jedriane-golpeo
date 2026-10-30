'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const env = require('../config/env');

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: env.DB_DIALECT || 'postgres',
  logging: false
});

const db = {};
const QuestionSet = require('./question-set')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);

db.QuestionSet = QuestionSet;
db.User = User;

if (User.associate) User.associate(db);
if (QuestionSet.associate) QuestionSet.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;

module.exports = db;
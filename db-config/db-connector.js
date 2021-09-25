const Sequelize = require('sequelize');

const POSTGRES_DB = 'DB_NAME'; // Add relevant database name
const POSTGRES_USER = 'USERNAME'; // Add relevant username
const POSTGRES_PASSWORD = 'PASSWORD'; // Add relevant password

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: 'localhost', // Add relevant host
  port: 5432, // Add relevant host
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  },
});

module.exports = {
  sequelize
}
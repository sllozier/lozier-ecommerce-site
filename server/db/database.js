const Sequelize = require('sequelize');


const databaseName = 'flintstones_gh';

const config = {}

if(process.env.QUIET) {
  config.logging = false;
}

//saw heroku postgres database issue and this resolves it
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config);
module.exports = db;

//do not touch!!!
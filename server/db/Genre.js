const Sequelize = require('sequelize');
const db = require('./database');

const Genre = db.define('genre', {
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Genre;

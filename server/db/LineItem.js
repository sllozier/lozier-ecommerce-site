const Sequelize = require('sequelize');
const db = require('./database');

const LineItem = db.define('lineItem', {
  name: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = LineItem;

const Sequelize = require('sequelize');
const db = require('./database');

const LineItem = db.define('lineItem', {
  name: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
    }
  },
});

module.exports = LineItem;

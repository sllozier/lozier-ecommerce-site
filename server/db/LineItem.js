const Sequelize = require('sequelize');
const db = require('./database');
const Order = require('./Order');
const Product = require('./Product');

const LineItem = db.define('lineitem', {
  // name: {
  //   type: Sequelize.STRING,
  // },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    }
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultVale: 0,
    validate: {
      min: 0
    }
  },

});

module.exports = LineItem;

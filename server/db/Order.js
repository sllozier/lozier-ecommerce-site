const Sequelize = require('sequelize');
const db = require('./database');

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  UUID: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },

});

module.exports = Order;

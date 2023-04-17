const Sequelize = require("sequelize");
const db = require("../database");

const Order = db.define("order", {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  orderTotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  UUID: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  purchaseDate: {
    type: Sequelize.DATE,
  },
  orderAddress: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;

const Sequelize = require("sequelize");
const db = require("../database");
//const Order = require('./Order');
//const Product = require('./Product');

const LineItem = db.define(
  "lineitem",
  {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    totalPrice: {
      type: Sequelize.FLOAT,
      defaultVale: 0,
      validate: {
        min: 0,
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (lineItem) => {
        const currentItems = await LineItem.findAll({
          where: { orderId: lineItem.orderId },
        });
        //console.log("LINE ITEM CURR", currentItems)
        if (
          currentItems.some(
            (item) => item.productId === Number(lineItem.productId)
          )
        )
          throw new Error("Item already exists in order");
      },
      beforeSave: async (lineItem) => {
        //console.log("LI QT BS", lineItem.quantity, "LI ORID BS", lineItem.orderId, "LI PRID BS", lineItem.productId)
        if (lineItem.quantity < 1)
          throw new Error("Quantity cannot be less than 1");
        const product = await lineItem.getProduct();
        //console.log("LINE ITEM PRODUCT STK", product.stock);
        //console.log("LINE ITEM QTY", lineItem.quantity)
        if (lineItem.quantity > product.stock)
          throw new Error("Quantity cannot be more than amount in stock");
      },
    },
  }
);

module.exports = LineItem;

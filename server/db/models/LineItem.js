const Sequelize = require('sequelize');
const db = require('../database');
//const Order = require('./Order');
//const Product = require('./Product');

const LineItem = db.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  },
  {
  hooks: {
    beforeCreate: async lineItem => {
        const currentItems = await LineItem.findAll({
            where: { orderId: lineItem.orderId },
        });
        if (
            currentItems.some(
                item => item.productId === Number(lineItem.productId)
            )
        )
            throw new Error('Item already exists in order');
    },
    beforeSave: async lineItem => {
        if (lineItem.qty < 1)
            throw new Error('Quantity cannot be less than 1');
        const product = await lineItem.getProduct();
        if (lineItem.qty > product.stock)
            throw new Error(
                'Quantity cannot be more than amount in stock'
            );
    },
},
});

module.exports = LineItem;
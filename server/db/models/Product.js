const Sequelize = require('sequelize');
const db = require('../database');
const Order = require('./Order');

// Album
const Product = db.define(
  'product',
  {
      name: {
          type: Sequelize.STRING,
          notNull: true,
      },
      price: {
          type: Sequelize.DECIMAL(10, 2),
          notNull: true,
          validate: {
            isDecimal: true,
            min: 0.0,
          },
      },
      stock: {
          type: Sequelize.INTEGER,
          defaultValue: 5,
      },
      popularity: {
          type: Sequelize.INTEGER,
          defaultValue: 50,
      },
      image: {
          type: Sequelize.STRING,
          defaultValue: "https://www.furnacemfg.com/wp-content/uploads/2018/12/black_vinyl.jpg",
      },
      spotifyId: {
          type: Sequelize.STRING,
      },
      trackTotal: {
          type: Sequelize.INTEGER,
      },
      releaseDate: {
          type: Sequelize.STRING,
          notNull: true,
      },
      label: {
          type: Sequelize.STRING,
      },
  },
  {
      hooks: {
          afterUpdate: async product => {
              const items = await product.getLineitems();
              await Promise.all(
                  items
                      .filter(item => item.quantity > product.stock)
                      .map(item => {
                          item.update({ quantity: product.stock });
                      })
              );
          },
      },
  }
);

module.exports = Product;

// Product.afterCreate(async(product) => {
//   if(product.id === 4){
//     await product.addOrder(1, {through: {quantity: 1, totalPrice: product.price}});
//     const cart1 = await Order.findByPk(1)
//     await cart1.increment ({'orderTotal': product.price}, {
//       where: {
//         id: 1
//       }
//     })
//     await product.addOrder(2, {through: {quantity: 1, totalPrice: product.price}});
//     const cart2 = await Order.findByPk(2)
//     await cart2.increment({'orderTotal':product.price}, {
//       where : {
//         id:2
//       }
//     })
//     await product.addOrder(3, { through: { quantity: 1, totalPrice: product.price}});
//     const cart3 = await Order.findByPk(3)
//     await cart3.increment({'orderTotal':product.price}, {
//       where : {
//         id:3
//       }
//     })
//   }
//   if (product.id == 3) {
//     await product.addOrder(1, { through: { quantity: 1, totalPrice: product.price}});
//     const cart = await Order.findByPk(1)
//     await cart.increment({'orderTotal':product.price}, {
//       where : {
//         id:1
//       }
//     })
//   }
//   if (product.id == 2) {
//     await product.addOrder(3, { through: { quantity: 1, totalPrice: product.price}});
//     const cart = await Order.findByPk(3)
//     await cart.increment({'orderTotal':product.price}, {
//       where : {
//         id:3
//       }
//     })
//   }
//   if (product.id == 1) {
//     await product.addOrder(3, { through: { quantity: 1, totalPrice: product.price}});
//     const cart = await Order.findByPk(3)
//     await cart.increment({'orderTotal':product.price}, {
//       where : {
//         id:3
//       }
//     })
//   }
// });

//module.exports = Product;

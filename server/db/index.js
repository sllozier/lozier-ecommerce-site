// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database');
const Sequelize = require('sequelize');
const Account = require('./Account');
const Order = require('./Order');
// const Genre = require('./Genre');
const LineItem = require('./LineItem');
const Product = require('./Product');

//associations
Order.belongsTo(Account);
Account.hasMany(Order);

Product.belongsToMany(Order, { through: LineItem });
Order.belongsToMany(Product, { through: LineItem });


const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });

    // Account
    const bilal = await Account.create({
      username: 'bilal',
      password: 'password1',
      email: 'bilal@gmail.com',
      firstName: 'Bilal',
      lastName: 'Abbas',
      address: '123 London Street',
      isAdmin: false,
    });

    const sarah = await Account.create({
      username: 'sarah',
      password: 'password2',
      email: 'sarah@gmail.com',
      firstName: 'Sarah',
      lastName: 'Lozier',
      address: '123 Maine Lane',
      isAdmin: false,
    });

    const will = await Account.create({
      username: 'w',
      password: 'w',
      email: 'will@gmail.com',
      firstName: 'Will',
      lastName: 'Siddons',
      address: '123 Philly Road',
      isAdmin: true,
    });

    const austin = await Account.create({
      username: 'austin',
      password: 'password4',
      email: 'austin@gmail.com',
      firstName: 'Austin',
      lastName: 'Gautney',
      address: '123 Stone Cold Court',
      isAdmin: true,
    });

    // Order
    const order1 = await Order.create({
      isCart: false,
      accountId: 1,
      // cart: [
      //   "product1",
      //   "product2"
      // ]
    });

    const order2 = await Order.create({
      isCart: false,
      accountId: 2,
    });

    const order3 = await Order.create({
      isCart: false,
      accountId: 3,
    });

    const order4 = await Order.create({
      isCart: false,
      accountId: 4,
    });

    // Genre
    // const pop = await Genre.create({
    //   name: 'pop',
    // });

    // const rock = await Genre.create({
    //   name: 'rock',
    // });

    // const classical = await Genre.create({
    //   name: 'classical',
    // });

    // const hipHop = await Genre.create({
    //   name: 'hip hop',
    // });

    // LineItem


    // Product
    const product1 = await Product.create({
      title: 'product1',
      price: 99.99,
      stock: 10,
      image: 'https://i.imgur.com/MZAcECn.png',
      description: 'lorem ipsum some text for product1...',
    });

    const product2 = await Product.create({
      title: 'product2',
      price: 12.50,
      stock: 15,
      image: 'https://i.imgur.com/GI9lCcj.png',
      description: 'lorem ipsum some text for product2...',
    });

    const product3 = await Product.create({
      title: 'product3',
      price: 10.99,
      stock: 25,
      image: 'https://i.imgur.com/hQw5iCB.png',
      description: 'lorem ipsum some text for product3...',
    });

    const product4 = await Product.create({
      title: 'product4',
      price: 5.00,
      stock: 10,
      image: 'https://i.imgur.com/0H3SsJa.png',
      description: 'lorem ipsum some text for product4...',
    });

    // seeding successful message
    // await product3.createLineitem()
    // await product1.createLineitem()
    // await product3.createLineitem()
    // await product1.createLineitem()
    // const test = await product3.getLineitem()
    // test.dataValues.quantity = product3.stock
    // await product3.setLineitem([1])
    console.log(`
    Seeding successful!
    Check the 'flintstones_gh' database for updates`,

      Object.keys(Order.prototype),
      Object.keys(Product.prototype),
      Object.keys(LineItem.prototype)
      // test
    );
  } catch (err) {
    // seeding failure message
    console.log(`
    Seeding Problem! Error in syncAndSeed Function: ${err}
    `);
  }
};

module.exports = {
  db,
  syncAndSeed,
  Account,
  Order,
  // Genre,
  LineItem,
  Product,
};

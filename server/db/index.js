// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database');
const Account = require('./Account');
const Order = require('./Order');
const Genre = require('./Genre');
const LineItem = require('./LineItem');
const Product = require('./Product');

//associations
Account.hasMany(Order);
Genre.hasMany(Product);
LineItem.belongsTo(Product);
Order.belongsTo(Account);
Order.hasMany(LineItem);

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
      isAdmin: false,
    });

    const sarah = await Account.create({
      username: 'sarah',
      password: 'password2',
      email: 'sarah@gmail.com',
      firstName: 'Sarah',
      lastName: 'Lozier',
      isAdmin: false,
    });

    const will = await Account.create({
      username: 'will',
      password: 'password3',
      email: 'will@gmail.com',
      firstName: 'Will',
      lastName: 'Siddons',
      isAdmin: true,
    });

    const austin = await Account.create({
      username: 'austin',
      password: 'password4',
      email: 'austin@gmail.com',
      firstName: 'Austin',
      lastName: 'Gautney',
      isAdmin: true,
    });

    // Order
    const order1 = await Order.create({
      isCart: false,
      address: '123 Test Street',
    });

    const order2 = await Order.create({
      isCart: true,
      address: '123 Test Street',
    });

    const order3 = await Order.create({
      isCart: false,
      address: '456 Placeholder Place',
    });

    const order4 = await Order.create({
      isCart: false,
      address: '789 Foo Avenue',
    });

    // Genre
    const pop = await Genre.create({
      name: 'pop',
    });

    const rock = await Genre.create({
      name: 'rock',
    });

    const classical = await Genre.create({
      name: 'classical',
    });

    const hipHop = await Genre.create({
      name: 'hip hop',
    });

    // LineItem
    const lineItem1 = await LineItem.create({
      name: 'lineItem1',
      quantity: 2,
    });

    const lineItem2 = await LineItem.create({
      name: 'lineItem2',
      quantity: 3,
    });

    const lineItem3 = await LineItem.create({
      name: 'lineItem3',
      quantity: 1,
    });

    const lineItem4 = await LineItem.create({
      name: 'lineItem4',
      quantity: 4,
    });

    // Product
    const product1 = await Product.create({
      title: 'product1',
      price: 99.99,
      quantity: 10,
      description: 'lorem ipsum some text for product1...',
    });

    const product2 = await Product.create({
      title: 'product2',
      price: 12.50,
      quantity: 15,
      description: 'lorem ipsum some text for product2...',
    });

    const product3 = await Product.create({
      title: 'product3',
      price: 10.99,
      quantity: 25,
      description: 'lorem ipsum some text for product3...',
    });

    const product4 = await Product.create({
      title: 'product4',
      price: 5.00,
      quantity: 10,
      description: 'lorem ipsum some text for product4...',
    });

    // seeding successful message
    console.log(`
    Seeding successful!
    Check the 'flintstones_gh' database for updates
  `);
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
  Genre,
  LineItem,
  Product,
};

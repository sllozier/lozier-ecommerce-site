// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database');

const Account = require('./models/Account');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Track = require('./models/Track');
const Artist = require('./models/Artist');
const Tag = require('./models/Tag');
const LineItem = require('./models/LineItem');
//test this.
//associations
Account.hasMany(Order);
Order.belongsTo(Account);


Product.belongsToMany(Order, { through: LineItem });
Order.belongsToMany(Product, { through: LineItem });

Product.hasMany(Track);
Track.belongsTo(Product);

Artist.hasMany(Product);
Product.belongsTo(Artist);

Tag.belongsToMany(Product, { through: 'productTag' });
Product.belongsToMany(Tag, { through: 'productTag' });


module.exports = {
  db,
  Account,
  Order,
  Track,
  Artist,
  LineItem,
  Product,
  Tag,
};

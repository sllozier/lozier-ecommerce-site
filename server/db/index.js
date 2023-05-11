// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require("./database");

const Account = require("./models/Account");
const Order = require("./models/Order");
const Product = require("./models/Product");
const Track = require("./models/Track");
const Artist = require("./models/Artist");
const Tag = require("./models/Tag");
const LineItem = require("./models/LineItem");
//test this.
//associations
Order.belongsTo(Account);
Account.hasMany(Order);

// Order.hasMany(LineItem);
// LineItem.belongsTo(Order);

// Product.hasMany(LineItem);
// LineItem.belongsTo(Product);

Product.belongsToMany(Order, { through: LineItem });
Order.belongsToMany(Product, { through: LineItem });

// Tag.belongsToMany(Product, { through: "productTag" });
// Product.belongsToMany(Tag, { through: "productTag" });

Product.hasMany(Track);
Track.belongsTo(Product);

Artist.hasMany(Product);
Product.belongsTo(Artist);

module.exports = {
  db,
  Account,
  Tag,
  Order,
  Product,
  Track,
  Artist,
  LineItem,
};

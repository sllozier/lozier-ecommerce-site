const Sequelize = require('sequelize');
const db = require('./database');

// NOTE: need to add authentication (jwt)
const Account = db.define('account', { 
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING, // needs to be encrypted?
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  isAdmin: { // true = admin account, false = user account
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

// // TODO: include additional helper functions where needed (placeholders for now)
// Account.prototype.getCart = async function () {
//   return
// };
// Account.prototype.addToCart = async function () {
//   return
// };
// Account.prototype.removeFromCart = async function () {
//   return
// };
// Account.prototype.createOrder = async function () {
//   return
// };

module.exports = Account;

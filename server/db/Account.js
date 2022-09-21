const Sequelize = require('sequelize');
const db = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 5;

// NOTE: need to add authentication (jwt)
const Account = db.define('account', { 
  username: {
    type: Sequelize.STRING,
    unique: true,
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
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: { // true = admin account, false = user account
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  // paymentInfo: {
  //   type: Sequelize.STRING,
  //   defaultValue: 'XXX-XXX-XXXX',
  // }
});
module.exports = Account;
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

//AUTH

Account.prototype.correctPassword = (candidatePwd) => {
  return bcrypt.compare(candidatePwd, this.password);
};

Account.prototype.generateToken = () => {
 return jwt.sign({ id: this.id }, process.env.JWT);
};

Account.findByToken = async(token) => {
  try{
    const { id } = await jwt.verify(token, process.env.JWT);
    const account = Account.findByPK(id);
    if(!account){
      throw 'not account';
    }
    return account;
  }catch{
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

Account.authenticate = async({username, password}) => {
  const account = await Account.findOne({
    where: {
      username,
    },
  });
  if(!account || !(await account.correctPassword(password))){
    const error = Error('Incorrect username or password');
    error.status = 401;
    throw error;
  }
    return account.generateToken();
  };
  
const hashPassword = async (account) => {
  if (account.changed('password')){
    account.password = await bcrypt.hash(account.password, SALT_ROUNDS);
  }
};

Account.beforeCreate(hashPassword);
Account.beforeUpdate(hashPassword);
Account.beforeBulkCreate((accounts) => Promise.all(account.map(hashPassword)));




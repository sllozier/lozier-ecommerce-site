const Sequelize = require('sequelize');
const db = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

//AUTH

Account.prototype.generateToken = async() => {
  try{
    const token = await jwt.sign({ id: this.id }, process.env.JWT);
    return { token };
  }catch(error){
    console.error(error);
  }
};

Account.byToken = async(token) => {
  try{
    const account = await jwt.verify(token, process.env.JWT);
    if(account){
      const user = await Account.findByPK(account.id);
      return user;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }catch{
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

Account.authenticate = async({username, password}) => {
  const user = await Account.findOne({
    where: {
      username,
    },
  });
  const match = await bcrypt.compare(password, user.password);
  
  if(match) {
    return user;
  }
  
  const error = Error('bad credentials');
    error.status = 401;
    throw error;
};

Account.addHook('beforeCreate', async(user) => {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 3);
  }
});



module.exports = Account;

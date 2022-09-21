const Sequelize = require('sequelize');
const db = require('./database');

// Album
const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate:{
      isDecimal: true,
      min: 0.0,
    },
  },
  stock: {
    type: Sequelize.INTEGER,
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "https://www.furnacemfg.com/wp-content/uploads/2018/12/black_vinyl.jpg"
    // 'vinyl_default.jpeg', // if this relative path doesn't render, use "https://www.furnacemfg.com/wp-content/uploads/2018/12/black_vinyl.jpg" as a fallback
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Product;

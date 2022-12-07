const db = require('../database');
const Sequelize = require('sequelize');


const Track = db.define('track', {
    name: {
        type: Sequelize.STRING,
        notNull: true,
    },
    spotifyId: {
        type: Sequelize.STRING,
        notNull: true,
    },
    length: {
        type: Sequelize.INTEGER,
        notNull: true,
    },
    explicit: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    preview: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: "https://www.furnacemfg.com/wp-content/uploads/2018/12/black_vinyl.jpg",
    },
});

module.exports = Track;
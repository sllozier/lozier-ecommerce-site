const db = require('./database');
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
});

module.exports = Track;
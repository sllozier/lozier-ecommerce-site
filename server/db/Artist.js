const db = require('./database');
const Sequelize = require('sequelize');

const Artist = db.define('artist', {
  name: {
    type: Sequelize.STRING,
    notNull: true,
  },
  spotifyId: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: '/piccies/defaultArtist.svg',
  },
  genre: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
});

module.exports = Artist;
// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database')
//models go here

//associations go here

const syncAndSeed = async () => {
    await db.sync({ force: true });
  //seed goes here
    
    console.log(`
    Seeding successful!
    Time for school!
  `);
};



module.exports = {
  db,
  syncAndSeed,
  //add model names here

}
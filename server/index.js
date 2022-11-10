const port = process.env.PORT || 3000;
const app = require('./app');
const db = require('./db')

const init = async () => {
    await db.seed();
    app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();


//dont touch me!
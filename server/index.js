const port = process.env.PORT || 3000;
const app = require('./app');
const { db } = require('./db');
const seed = require('./db/seed');

const init = async () => {
    try{
        if (process.env.SEED === 'true'){
            await seed();
        }else{
            await db.sync();
        }
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }catch(error){
        console.log("INDEX ERROR", error);
    }
};

init();


//dont touch me!
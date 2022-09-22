const { Account } = require('../db');

const requireToken = async (req, res, next) => {
    try{
        const account = await Account.byToken(req.headers.authorization);
        req.account = account;
    }catch(error){
        next(error);
    }
};

const isAdmin = async(req, res, next) => {
    try{
        if(!req.user.isAdmin) {
            console.log('NOT AN ADMIN!');
            res.status(403).send('not an admin');
        }
    }catch(error){
        next(error);
    }
};

module.exports = {
    requireToken,
    isAdmin,
};
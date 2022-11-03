const router = require('express').Router();
const { Order, Account } = require('../db');
const { requireToken } = require('./gateKeeper');


//Account routes
router.get('/accounts', requireToken, async (req, res, next) => {
    try {
        const accounts = await Account.findAll();
        res.send(accounts);
    } catch (error) {
        next(error)
    }
});

router.get('/accounts/:id', requireToken, async (req, res, next) => {
    try{
        const account = await Account.findByPk(req.params.id, {
            include : {
                model: Order,
            }
        });
        res.send(account);
    }catch(error){
        next(error);
    }
})

router.post('/accounts', async (req, res, next) => {
    try {
        req.body.isAdmin = false;
        const account = await Account.create(req.body)
        console.log('ACCOUNT API', account);
        res.send(account);
    } catch (error) {
        next(error);
    }
});

router.put('/accounts/:id', requireToken, async(req, res, next) => {
    try{
        const account = await Account.findByPk(req.account.id);
        await account.update(req.body);
        res.send(account);
    }catch(error){
        next(error);
    }
});

router.delete('/accounts/:id', requireToken, async(req, res, next) => {
    try{
        const deleteAccount = await Account.findByPk(req.params.id);
        await deleteAccount.destroy();
        res.send(deleteAccount);
    }catch(error){
        next(error);
    }
});

module.exports = router;
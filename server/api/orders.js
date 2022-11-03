const router = require('express').Router();
const { Order, Account } = require('../db');


//NEED TO REWRITE??

router.get('/orders', async (req, res, next) => {
    try {
        const orderList = await Order.findAll({
            where: {
                isCart: false,
            },
            include: {
                model: Account,
            },
        });
        res.send(orderList);
    }catch(error){
        next(error)
    }
});

router.get('/orders/:id', async(req, res, next) => {
    try{
        const singleOrder = await Order.findByPk(req.params.id, {
            where: {
                isCart: false,
            },
            include: {
                model: Account,
            },
        });
        res.send(singleOrder);
    }catch(error){
        next(error);
    }
});








module.exports = router;
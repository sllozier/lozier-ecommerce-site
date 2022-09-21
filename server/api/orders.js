const router = require('express').Router();
const { Order, Account, Product } = require('../db');

router.get('/orders', async (req, res, next) => {
    try {
        const allOrders = await Order.findAll({});
        res.send(allOrders);
    } catch (error) {
        next(error)
    }
})

// router.get('/orders/:id', async (req, res, next) => {
//     try {
//         const id = req.params.id
//         const singleOrder = await Order.findByPk(id);
//     if (singleOrder) {
//       res.send(singleOrder);
//     } else {
//       res.send('error: no order available');
//     }
//     } catch (error) {
//         next(error)
//     }
// });

router.get('/orders/:id', async(req, res, next) => {
    try{
        const account = Account.findOne({
            where: {
                id: req.params.id,
            },
            include: [ Product ],
        });
        res.send(account);
    }catch(error){
        next(error);
    }
});

router.post('/orders/guest', async(req, res, next) => {
    try{
        let guestOrders = req.body;
        res.status(201).send(
            guestOrders.map((order) => {
                return Order.create(order);
            })
        )
    }catch(error){
        next(error);
    }
})



 module.exports = router;
const router = require('express').Router();
const { isRejectedWithValue } = require('@reduxjs/toolkit');
const { Order, Account, Product, Track, Artist, LineItem } = require('../db');
const { requireToken, isAdmin } = require("./gateKeeper")

//get all orders with all info
router.get('/orders/:accountId', requireToken, async(req, res, next) => {
    try{
        const orderList = await Order.findAll({
            where: {
                accountId: req.params.userId
            },
            attributes: ['id', 'complete'],
            include: {
                model: LineItem,
                attributes: ['id', 'quantity'],
                include: {
                    model: Product,
                    attributes: ['id', 'name', 'stock', 'price', 'image'],
                    include: {
                        model: Artist,
                        attributes: ['id', 'name'],
                    },
                },
            },
        });
        res.send(orderList);
    }catch(error){
        next(error);
    }
});

//change order
router.put('/orders', requireToken, async(req, res, next) => {
    try{
        await Order.update({ complete: true}, {
            where: {
                complete: false,
                accountId: req.account.id,
            },
        });
        await Order.create({ accountId: req.account.id });
    }catch(error){
        next(error);
    }
});

//change lineitem quantity
router.put('/orders/qty', requireToken, async(req, res, next) => {
    try{
        await LineItem.update({ quantity: req.body.num }, {
            where: {
                id: req.body.itemId
            },
            individualHooks: true,
        })
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
});

//update product stock
router.put('/orders/stock', async(req, res, next) => {
    try{
        if(req.body.secret !== process.env.JWT){
            throw new Error('secret required');
        }

        //change order to complete
        if(req.body.orderId){
            const fetchOrder = await Order.findByPk(req.bodyorderId);
            Order.create({ accountId: fetchOrder.accountId });
            await Order.update({ complete: true }, {
                where: {
                    id: req.body.orderId
                },
            });
        }

        //remove item from stock
        for(const [key, value] of Object.entries(req.body.qtyContainer)) {
            const product = await Product.findByPk(Number(key));
            const newStock = product.stock - value;
            await Product.update({ stock: newStock }, {
                where: {
                    id: Number(key)
                }
            });
        }
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        next(error);
    }
});

//add lineitem by product Id
router.put('/orders/:productId', requireToken, async(req, res, next) => {
    try{
        const order = await Order.findOne({
            where: {
                complete: false,
                accountId: req.account.id,
            },
        });
        const lineItem = await LineItem.create({
            orderId: order.id,
            productId: req.params.productId,
        });
        const newItem = await LineItem.findByPk(lineItem.id, {
            attributes: ['id', 'quantity'],
            include: {
                model: Product,
                attributes: ['id', 'name', 'stock', 'price', 'image'],
                include: {
                    model: Artist,
                    attributes: ['id', 'name'],
                },
            },
        });
        res.send(newItem);
    }catch(error){
        next(error);
    }
});

//remove lineitem from order
router.delete('/orders/:lineItemId', requireToken, async(req, res, next) => {
    try{
        await LineItem.destroy({
            where: {
                id: req.params.lineItemId
            },
        });
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
})

// router.get('/orders', async (req, res, next) => {
//     try {
//         const orderList = await Order.findAll({
//             where: {
//                 isCart: false,
//             },
//             include: {
//                 model: Account,
//             },
//         });
//         res.send(orderList);
//     }catch(error){
//         next(error)
//     }
// });

// router.get('/orders/:id', async(req, res, next) => {
//     try{
//         const singleOrder = await Order.findByPk(req.params.id, {
//             where: {
//                 isCart: false,
//             },
//             include: {
//                 model: Account,
//             },
//         });
//         res.send(singleOrder);
//     }catch(error){
//         next(error);
//     }
// });








module.exports = router;
const router = require('express').Router();
const { Order, Account, Product, LineItem } = require('../db');
const Sequelize = require('sequelize');


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

router.get('/orders/guest', async (req, res, next) => {
    try {
        // const lineitems = await LineItem.findAll()
        // var total = 0
        // for (let i = 0; i < lineitems.length; i++) {
        //     // console.log(lineitems[i].dataValues.productId)
        //     const product = await Product.findOne({
        //         where: {
        //             id: lineitems[i].dataValues.productId
        //         }
        //     })
        //     console.log(product)
        // }
        // const lineitems = await LineItem.findAll({
        //     attributes: [
        //         "productId",
        //         [Sequelize.fn("COUNT", Sequelize.col("id")), "count_test"],
        //     ],
        //     group: "productId",
        // });
        // console.log(lineitems)

        res.send(`total: `)
    } catch (error) {
        next(error);
    }
})

router.get('/orders/:id', async (req, res, next) => {
    try {
        const account = Account.findOne({
            where: {
                id: req.params.id,
            },
            include: [Product],
        });
        res.send(account);
    } catch (error) {
        next(error);
    }
});



router.post('/orders/guest', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.body.id)
        let guestOrders = await product.createLineitem()
        console.log(guestOrders)
        // guestorders -> reduce to [{productid: 1, qty: 2 total: productidprice * qty}, {}]
        res.status(201).send(guestOrders)
    } catch (error) {
        next(error);
    }
})





module.exports = router;
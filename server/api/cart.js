const router = require('express').Router();
const { Order, Account, Product, LineItem } = require('../db');

router.get('/cart', async (req, res, next) => {
    try {
        const lineitems = await LineItem.findAll()
        res.send(lineitems)
    } catch (error) {
        next(error)
    }
})

router.get('/cart/line-item-qty', async (req, res, next) => {
    try {
        let lineitemsObj = {}
        const lineitems = await LineItem.findAll()

        for (i = 0; i < lineitems.length; i++) {
            console.log(lineitemsObj)
            if (lineitemsObj[lineitems[i].dataValues.productId]) {
                lineitemsObj[lineitems[i].dataValues.productId] += 1
            } else {
                lineitemsObj[lineitems[i].dataValues.productId] = 1
            }
        }
        res.send(lineitemsObj)
    } catch (error) {
        next(error)
    }
})

router.post('/cart', async (req, res, next) => {
    try {
        if (req.body.UUID === null && req.body.accountId === 0) {
            let cart = await Order.create()
            const product = await Product.findByPk(req.body.id)
            const exists = cart.hasProduct(product)
            if (!exists) {
                await cart.addProduct(product)
                await cart.save()
            }
            const response = { id, UUID } = cart
            res.send(response)
        } else if (req.body.UUID === null) {
            let cart = await Order.create({
                accountId: req.body.accountId
            })
            const product = await Product.findByPk(req.body.id)
            const exists = cart.hasProduct(product)
            if (!exists) {
                await cart.addProduct(product)
                await cart.save()
            }
            const response = { id, UUID } = cart
            res.send(response)
        } else {
            let cart = await Order.findOne({
                where: {
                    isCart: false,
                    UUID: req.body.UUID,

                },
            });
            const product = await Product.findByPk(req.body.id)
            const exists = cart.hasProduct(product)
            if (!exists) {
                await cart.addProduct(product)
                await cart.save()
            }
            const response = { id, UUID } = cart
            res.send(response)
        }
    } catch (error) {
        next(err)
    }
})

router.put('/cart', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.body.id)
        const cart = await Order.findOne({
            where: {
                isCart: false,
                UUID: req.body.UUID,

            },
        });
        const total = product.price * req.body.num
        // await LineItem.increment
    } catch (error) {
        next(error)
    }
})

module.exports = router;

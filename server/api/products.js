const router = require('express').Router();
const Product = require('../db/Product');
const { isAdmin, requireToken } = require('./gateKeeper');

router.get('/products', async (req, res, next) => {
    try {
        const products = await Product.findAll()
        res.send(products)
    } catch (error) {
        next(error)
    }
})

router.get('/products/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id)
        if (product) {
            res.send(product)
        } else {
            res.send('error: no product available')
        }
    } catch (error) {
        next(error)
    }
})

router.post('/products', requireToken, isAdmin, async (req, res, next) => {
    try {
        res.send(await Product.create(req.body))
    } catch (error) {
        next(error)
    }
})

router.delete('/products/:id', async (req, res, next) => {
    try {
        const toBeDeleted = await Product.findByPk(req.params.id)
        await toBeDeleted.destroy()
        res.send(toBeDeleted)
    } catch (error) {
        next(error)
    }
})

router.put('/products/:id', async (req, res, next) => {
    try {
        const toBeUpdated = await Product.findByPk(req.params.id)
        console.log(toBeUpdated)
        res.send(await toBeUpdated.update(req.body))
    } catch (error) {
        next(error)
    }
})

module.exports = router;
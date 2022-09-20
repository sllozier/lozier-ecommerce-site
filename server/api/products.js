const router = require('express').Router();
const Product = require('../db/Product')

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

module.exports = router;
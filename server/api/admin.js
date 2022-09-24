const router = require('express').Router();
const Product = require('../db/Product');
const { isAdmin, requireToken } = require('./gateKeeper');




router.post('/admin', requireToken, isAdmin, async (req, res, next) => {
    try {
        console.log('ADMIN API', req.body)
        const product = await Product.create(req.body);
        console.log('ADMIN PRODUCT', product)
        res.send(product);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
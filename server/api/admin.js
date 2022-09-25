const router = require('express').Router();
const Product = require('../db/Product');
const { isAdmin, requireToken } = require('./gateKeeper');

router.get('/admin/products', async(req, res, next) => {
    try{
        const products = await Product.findAll();
        res.send(products);
    }catch(error){
        next(error);
    }
});

router.get('/admin/products/:id', async (req, res, next) => {
    try{
        const product = await Product.findByPk(req.params.id);
        res.send(product);
    }catch(error){
        next(error);
    }
});

router.put('/admin/products/:lineItemId', async(req, res, next) => {
    try{
        const product = await Product.findByPk(req.params.lineItemId);
        await product.update(req.body);
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
});


router.post('/admin/products', requireToken, isAdmin, async (req, res, next) => {
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
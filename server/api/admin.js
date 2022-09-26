const router = require('express').Router();
const Product = require('../db/Product');
const { isAdmin, requireToken } = require('./gateKeeper');

router.get('/admin/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get('/admin/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.put('/admin/products/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByPk(req.params.id);
    res.send(await updatedProduct.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.post('/admin/products', requireToken, isAdmin, async (req, res, next) => {
  try {
    console.log('hit')
    const newProduct = await Product.create(req.body);
    console.log(newProduct)
    res.send(newProduct);
  } catch (error) {
    console.log(isAdmin)
    next(error);
  }
});
// router.post('/admin/products', async (req, res, next) => {
//   try {
//     const newProduct = await Product.create(req.body);
//     console.log(newProduct)
//     res.send(newProduct);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
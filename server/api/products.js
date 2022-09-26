const router = require('express').Router();

const Product = require('../db/Product');


router.get('/products', async (req, res, next) => {
  try {

    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByPk(req.params.id);
    await deleteProduct.destroy();
    // res.sendStatus(200);
    res.send(deleteProduct)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
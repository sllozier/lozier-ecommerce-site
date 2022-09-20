const router = require('express').Router();
const { Order } = require('../db');

router.get('/orders', async (req, res, next) => {
    try {
        const allOrders = await Order.findAll({});
        res.send(allOrders);
    } catch (error) {
        next(error)
    }
})

router.get('/orders/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const singleOrder = await Order.findByPk(id);
    if (singleOrder) {
      res.send(singleOrder);
    } else {
      res.send('error: no order available');
    }
    } catch (error) {
        next(error)
    }
})

module.exports = router;
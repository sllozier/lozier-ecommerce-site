const router = require('express').Router();

router.get('/orders', (req, res, next) => {
    try {
        res.send('all orders')
    } catch (error) {
        next(error)
    }
})

router.get('/orders/:id', (req, res, next) => {
    try {
        const id = req.params.id
        res.send(`single order: order ${id}`)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
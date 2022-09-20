const router = require('express').Router();

router.get('/products', (req, res, next) => {
    try {
        res.send('all products')
    } catch (error) {
        next(error)
    }
})

router.get('/products/:id', (req, res, next) => {
    try {
        const id = req.params.id
        res.send(`single products: product ${id}`)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
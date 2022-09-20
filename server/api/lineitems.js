const router = require('express').Router();

router.get('/lineitems', (req, res, next) => {
    try {
        res.send('all lineitems')
    } catch (error) {
        next(error)
    }
})

router.get('/lineitems/:id', (req, res, next) => {
    try {
        const id = req.params.id
        res.send(`single lineitem: lineitem ${id}`)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
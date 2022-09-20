const router = require('express').Router();
const LineItem = require('../db/LineItem')

router.get('/lineitems', async (req, res, next) => {
    try {
        const lineitems = await LineItem.findAll()
        res.send(lineitems)
    } catch (error) {
        next(error)
    }
})

router.get('/lineitems/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const lineitem = await LineItem.findOne({
            where: {
                id: id
            }
        })
        res.send(lineitem)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
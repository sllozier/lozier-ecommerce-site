const router = require('express').Router();

router.get('/accounts', (req, res, next) => {
    try {
        res.send('all accounts')
    } catch (error) {
        next(error)
    }
})

router.get('/accounts/:id', (req, res, next) => {
    try {
        const id = req.params.id
        res.send(`single account: account ${id}`)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
const router = require('express').Router();
const Account = require('../db/Account')

router.get('/accounts', async (req, res, next) => {
    try {
        const accounts = await Account.findAll()
        res.send(accounts)
    } catch (error) {
        next(error)
    }
})

router.get('/accounts/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const account = await Account.findOne({
            where: {
                id: id
            }
        })
        res.send(account)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
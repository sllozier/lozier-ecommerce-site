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
        const account = await Account.findByPk(id)
        if (account) {
            res.send(account)
        } else {
            res.send('error: no account available');
        }
    } catch (error) {
        next(error)
    }
})

// router.post('/accounts', async (req, res, next) => {
//     try {
//         const account = await Account.create(req.body)
//         res.send(account)
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router;
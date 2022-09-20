const router = require('express').Router();

router.get('/genres', (req, res, next) => {
    try {
        res.send('all genres')
    } catch (error) {
        next(error)
    }
})

router.get('/genres/:id', (req, res, next) => {
    try {
        const id = req.params.id
        res.send(`single genre: genre ${id}`)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
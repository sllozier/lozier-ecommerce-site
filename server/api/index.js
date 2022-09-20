const router = require('express').Router();
// const productRouter = require('./products')

router.get('/', (req, res) => {
    res.send('hello')
})

router.use('/', require('./products'))
router.use('/', require('./accounts'))

router.use((req, res, next) => {
    const err = new Error('API route not found!');
    err.status = 404;
    next(err);
});

module.exports = router;
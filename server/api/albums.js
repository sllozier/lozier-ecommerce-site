const router = require('express').Router();

const Product = require('../db/Product');


router.get('/albums', async (req, res, next) => {
  try {

    const albumList = await Product.findAll();
    res.send(albumList);
  } catch (error) {
    next(error);
  }
});

router.get('/albums/:id', async (req, res, next) => {
  try {
    const singleAlbum = await Product.findByPk(req.params.id);
    res.send(singleAlbum);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
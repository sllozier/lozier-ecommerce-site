const router = require("express").Router();
//trying to push
const { Product, Artist, Track } = require("../db");

router.get("/albums", async (req, res, next) => {
  try {
    const albumList = await Product.findAll({
      include: Artist,
    });
    res.send(albumList);
  } catch (error) {
    next(error);
  }
});

router.get("/albums/:id", async (req, res, next) => {
  try {
    const singleAlbum = await Product.findByPk(req.params.id, {
      include: [Track, Artist],
    });
    res.send(singleAlbum);
  } catch (error) {
    next(error);
  }
});

router.get("/artist/:id", async (req, res, next) => {
  try {
    const singleArtist = await Artist.findByPk(req.params.id, {
      include: Product,
    });
    res.send(singleArtist);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

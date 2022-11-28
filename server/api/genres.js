// const router = require('express').Router();
// const { Genre } = require('../db');

// router.get('/genres', async (req, res, next) => {
//   try {
//     const allGenres = await Genre.findAll({});
//     res.send(allGenres);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/genres/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const singleGenre = await Genre.findByPk(id);
//     if (singleGenre) {
//       res.send(singleGenre);
//     } else {
//       res.send('error: no genre available');
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

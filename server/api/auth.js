const router = require('express').Router();
const { Account } = require('../db');


router.post('/auth/signup', async (req, res, next) => {
  try {
    const account = await Account.findByToken(req.headers.authorization);
    res.send(account);
  } catch (error) {
      next(error)
    }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    const token = await Account.authenticate(req.body);
    res.send(token);
  } catch (error) {
    next(error);
  }
});

// router.get('/auth/authuser', async (req, res, next) => {
//   try {
//     const authUser = await Account.findByToken(req.headers.authorization);
//     res.send(authUser);
//   } catch (error) {
//     next(error)
//   }
// })


module.exports = router;
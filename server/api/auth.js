const router = require('express').Router();
const { Account } = require('../db');


router.post('/auth', async (req, res, next) => {
  try {
    console.log('Acct Info?', req.headers.authorization)
    const account = await Account.byToken(req.headers.authorization);
    console.log('AUTHACCT API', account);
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




module.exports = router;
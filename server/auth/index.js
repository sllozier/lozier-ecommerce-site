const router = require('express').Router();
const { Account } = require('../db');


router.get('/', async (req, res, next) => {
  try {
    const user = await Account.byToken(req.headers.authorization);
    res.send(user);
  } catch (error) {
      next(error)
    }
});

router.post('/login', async (req, res, next) => {
  try {
    const token = await Account.authenticate(req.body);
    res.send(token);
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try{
    const user = await Account.create(req.body);
    res.send({ token: await user.generateToken(), id: user.id})
  }catch(error){
    next(error);
  }
})




module.exports = router;
const router = require('express').Router();
const Account = require('./database');

router.post('/signUp', async( req, res, next) => {
  try{
    const account = await Account.create(req.body);
    if(!account) res.sendStatus(404);
    const token = await user.generateToken()
    res.send(token);
  }catch(error){
    next(error)
  }
});

router.post('/login', async(req, res, next) => {
  try{
    const token = await Account.authenticate(req.body);
    res.send(token);
  }catch(error){
    next(error);
  }
});

router.get('/authUser', async(req, res, next) => {
  try{
    const authUser = await Account.findByToken(req.headers.authorization);
    res.send(authUser);
  }catch(error){
    next(error)
  }
})


module.exports = router;
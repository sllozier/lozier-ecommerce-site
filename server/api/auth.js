const router = require('express').Router();
const Account = require('./database');

router.post('/signUp', async( req, res, next) => {
  try{
    const user = await Account.create(req.body);
    if(!user) res.sendStatus(404);
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
    const authUser = await User.findByToken(req.headers.authorization);
    res.send(authUser);
  }catch(error){
    next(error)
  }
})


module.exports = router;
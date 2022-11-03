const router = require('express').Router();
const { Account, Order, Product } = require('../db');
const { isAdmin, requireToken } = require('./gateKeeper');

//Admin routes
router.get('/admin/:id', requireToken, isAdmin, async(req, res, next) => {
  try{
    const admin = await Account.findByPk(req.params.id);
    res.send(admin);
  }catch(error){
    next(error);
  }
});

router.get('/admin', async(req, res, next) => {
  try{
    const adminList = await Account.findAll({
      where: {
        isAdmin: true
      }
    });
    res.send(adminList);
  }catch(error){
    next(error);
  }
});

router.delete('/admin/:id', async(req, res, next) => {
  try{
    const deletedAdmin = await Account.findByPk(req.params.id);
    await deletedAdmin.destroy();
    res.send(deletedAdmin);
  }catch(error){
    next(error);
  }
});

router.put('/admin/:id', async(req, res, next) => {
  try{
    const updatedAdmin = await Account.findByPk(req.params.id);
    await updatedAdmin.update(req.body);
    res.send(updatedAdmin);
  }catch(error){
    next(error);
  }
});



//Admin-User routes
router.get('/admin/:id/users', async(req, res, next) => {
  try{
    const userList = await Account.findAll({
      where: {
        isAdmin: false,
      }
    });
    res.send(userList);
  }catch(error){
    next(error);
  }
});

router.get('/admin/:id/users/:userId', async(req, res, next) => {
  try{
    const singleUser = await Account.findByPk(req.params.userId, {
      where: {
        isAdmin: false,
      },
      include: {
        model: Order,
      }
    });
    res.send(singleUser);
  }catch(error){
    next(error);
  }
});

router.delete('/admin/:id/users/:userId', async(req, res, next) => {
  try{
    const deletedUser = await Account.findByPk(req.params.userId);
    await deletedUser.destroy();
  }catch(error){
    next(error);
  }
});

router.put('/admin/:id/users/:userId', async(req, res, next) => {
  try{
    const updatedUser = await Account.findByPk(req.params.userId);
    await updatedUser.update(req.body);
    res.send(updatedUser);
  }catch(error){
    next(error);
  }
});

//Admin-Product routes
router.get('/admin/:id/products', async(req, res, next) => {
  try{
    const productList = await Product.findAll();
    res.send(productList);
  }catch(error){
    next(error);
  }
});

router.get('/admin/:id/products/:productId', async(req, res, next) => {
  try{
    const singleProduct = await Product.findByPk(req.params.productId);
    res.send(singleProduct);
  }catch(error){
    next(error);
  }
});

router.post('/admin/:id/products', async(req, res, next) => {
  try{
    const addProduct = await Product.create(req.body);
    res.send(addProduct);
  }catch(error){
    next(error);
  }
});

router.delete('/admin/:id/products/:productId', async(req, res, next) => {
  try{
    const deletedProduct = await Product.findByPk(req.params.productId);
    await deletedProduct.destroy();
  }catch(error){
    next(error);
  }
});

router.put('/admin/:id/products/:productId', async(req, res, next) => {
  try{
    const updatedProduct = await Product.findByPk(req.params.productId);
    await updatedProduct.update(req.body);
    res.send(updatedProduct);
  }catch(error){
    next(error);
  }
});


//Admin-Order routes
router.get('/admin/:id/orders', async(req, res, next) => {
  try{
    const orderList = await Order.findAll();
    res.send(orderList);
  }catch(error){
    next(error);
  }
});

router.get('/admin/:id/orders/:orderId', async(req, res, next) => {
  try{
    const singleOrder = await Order.findByPk(req.params.orderId);
    res.send(singleOrder);
  }catch(error){
    next(error);
  }
});

router.post('/admin/:id/orders', async(req, res, next) => {
  try{
    const addOrder = await Order.create(req.body);
    res.send(addOrder);
  }catch(error){
    next(error);
  }
});

router.delete('/admin/:id/orders/:orderId', async(req, res, next) => {
  try{
    const deletedOrder = await Order.findByPk(req.params.orderId);
    await deletedOrder.destroy();
  }catch(error){
    next(error);
  }
});

router.put('/admin/:id/orders/:orderId', async(req, res, next) => {
  try{
    const updatedOrder = await Order.findByPk(req.params.orderId);
    await updatedOrder.update(req.body);
    res.send(updatedOrder);
  }catch(error){
    next(error);
  }
});



// router.get('/admin/products', async (req, res, next) => {
//   try {
//     const products = await Product.findAll();
//     res.send(products);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/admin/products/:id', async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.id);
//     res.send(product);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put('/admin/products/:id', async (req, res, next) => {
//   try {
//     const updatedProduct = await Product.findByPk(req.params.id);
//     res.send(await updatedProduct.update(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

// // router.post('/admin/products', requireToken, isAdmin, async (req, res, next) => {
// //   try {
// //     console.log('hit')
// //     const newProduct = await Product.create(req.body);
// //     console.log(newProduct)
// //     res.send(newProduct);
// //   } catch (error) {
// //     // console.log(isAdmin)
// //     next(error);
// //   }
// // });

// router.post('/admin/products', async (req, res, next) => {
//   try {
//     const newProduct = await Product.create(req.body);
//     console.log(newProduct)
//     res.send(newProduct);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/admin/accounts', async (req, res, next) => {
//   try {
//     const allAccounts = await Account.findAll();
//     res.send(allAccounts)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/admin/accounts/:id', async (req, res, next) => {
//   try {
//     const accountToDel = await Account.findByPk(req.params.id)
//     await accountToDel.destroy()
//     res.send(accountToDel)
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/admin/accounts/:id', async (req, res, next) => {
//   try {
//     const accountToBeEdited = await Account.findByPk(req.params.id)
//     res.send(await accountToBeEdited.update(req.body))
//   } catch (error) {

//   }
// })

module.exports = router;
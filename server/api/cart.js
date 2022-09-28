const router = require('express').Router();
const { Op } = require('sequelize')
const { Order, Product, LineItem } = require('../db');

//this should create a new cart.
router.post('/cart', async (req, res, next) => {
    try {
        if (req.body.UUID === 'empty' || req.body.accountId === 0) {
            let cart = await Order.create();
            const product = await Product.findByPk(req.body.productId);
            const doesExist = await cart.hasProduct(product);
            if (!doesExist) {
                await cart.addProduct(product)
                await cart.save()
            }
            
            const response = { id, UUID } = cart
            
            res.send(response)
        } else if(req.body.UUID === 'empty') {

            let cart = await Order.create({
                accountId: req.body.accountId
            });
            
            const product = await Product.findByPk(req.body.productId);
            const doesExist = await cart.hasProduct(product);
            
            if (!doesExist) {
                await cart.addProduct(product)
                await cart.save()
            }
            const response = { id, UUID } = cart
            res.send(response)
        } else {
            
            let cart = await Order.findOne({
                where: {
                    isCart: true,
                    UUID: req.body.UUID,
                },
            });
           
            const product = await Product.findByPk(req.body.productId)
            const doesExist = await cart.hasProduct(product)
            
            if (!doesExist) {
                await cart.addProduct(product)
                await cart.save()
            }
            const response = { id, UUID } = cart
            res.send(response)
        }
    } catch (error) {
        next(error)
    }
});


//this should update the line item quantities...
router.put('/cart', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.body.productId);
        const cart = await Order.findOne({where: {UUID: req.body.UUID}});
        // console.log('CART API PRODUCT PRICE?', product.price)
        // console.log('UPDATE CART BODY?', req.body)
        const total = (product.price * req.body.num).toFixed(2);
        if(req.body.op = 'increment'){
            await LineItem.increment('quantity', {
                where: {
                    orderId: req.body.cartId,
                    productId: req.body.productId,
                },
            })
            await LineItem.increment({'totalPrice': product.price}, {
                where: {
                    orderId: req.body.cartId,
                    productId: req.body.productId,
                },
            })
            await cart.increment({'orderTotal': product.price}, {
                where: {
                    id: req.body.cartId
                },
            })
        }else if(req.body.op === 'decrement'){
            await LineItem.decrement('quantity', {
                where: {
                    orderId: req.body.cartId,
                    productId: req.body.productId,
                    quantity: {
                        [Op.gt]: 0,
                    },
                },
            })
            await LineItem.decrement({'totalPrice': product.price}, {
                where: {
                    orderId: req.body.cartId,
                    productId: req.body.productId,
                },
            })
            await cart.decrement({'orderTotal': product.price}, {
                where: {
                    id: req.body.cartId,
                },
            })
        }else if(req.body.op === 'remove'){
            await cart.decrement({'orderTotal': total}, {
                where: {
                    id: req.body.cartId,
                }
            })
        }
        //console.log('CHANGE QTY CART', cart)
        res.send(cart)
    } catch (error) {
        next(error)
    }
});

//can we checkout?
router.put('/cart/:UUID', async(req, res, next) => {
    try{
        const order = await Order.findOne({
            where: {
                UUID: req.params.UUID,
            },
        });
        await order.update({ isCart: false });
        await order.update({
            purchaseDate: new Date()
        });
        res.send(order)
    }catch(error){
        next(error);
    }
});

//fetch existing cart
router.get('/cart/:accountId/:UUID', async(req, res, next) => {
    try{
        let cart = false;
        if(req.params.UUID !== 'empty'){
            cart = await Order.findOne({
                where: {
                    UUID: req.params.UUID,
                    isCart: true,
                },
                include: {
                    model: Product,
                    attributes: ['id', 'title', 'price', 'stock', 'description', 'image'],
                },
            });
        }else if(req.params.accountId !== 0){
            cart = await Order.findOne({
                where: {
                    UUID: req.params.UUID,
                    isCart: true,
                },
                include: {
                    model: Product,
                    attributes: ['id', 'title', 'price', 'stock', 'description', 'image'],
                },
            })
        }if(cart === false){
            res.status(200)
        }
        res.send(cart);
    }catch(error){
        next(error);
    }
});

//remove something from the cart?
router.delete('/cart/:itemId/:UUID', async (req, res, next) => {
    try{
        const cart = await Order.findOne({
            where: {
                UUID: req.params.UUID,
                isCart: true,
            },
            include: {
                model: Product,
                where: {
                    id: req.params.itemId,
                },
            },
        });
        await cart.removeProduct(req.params.itemId);
        res.send(cart);
    }catch(error){
        next(error);
    }
});

//attach a 'cart' to a new user?
router.put('/cart/attach/:accountId', async(req, res, next) => {
    try{
        const cart = await Order.findOne({
            where: {
                UUID: req.body.UUID,
            },
        });
        await cart.update({accountId: req.params.accountId})
        res.send(cart);
    }catch(error){
        next(error);
    }
});

module.exports = router;

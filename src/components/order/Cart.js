import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, updateQuantities, removeItem, checkout } from '../../store/reducers1/cartReducer';


//DIVIDE INTO CHOOSE QTY COMP, DELETE ITEM COMP, GUEST/USER CART COMP, 
//CHECKOUT, PAYMENTREC OR CONFIRM COMP?
//LOOK AT LEAGUE-OF-LEGENDS-CARDS REPO!
const Cart = () => {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.account);
    const cart = useSelector((state) => state.cart);
    console.log('WHO IS AUTH?', auth.address);
    console.log('CART', cart);

    let UUID = cart.UUID || 'empty';
    const accountId = auth.id || 0;
    if (accountId === 0 && UUID === 'empty' && localStorage.UUID !== undefined) {
        UUID = localStorage.getItem('UUID');
    }
    //const lineItems = cart.products || [];

    useEffect(() => {
        dispatch(fetchCart(accountId, UUID));
    }, [accountId]);


    return (
        <div>
            {cart?.products ? (
                <div>

                    <div className='row-lineItem'>
                        <div className='column'>
                            {cart?.products?.map((item) => (
                                <div key={item.id} className='row-item'>

                                    <Link to={`/products/${item.id}`}>
                                        <img className='album-img' src={item['image']} />
                                    </Link>



                                    <h3 className='column'>
                                        {item['title']}
                                    </h3>
                                    <h3 className='column'>
                                        $ {item['price']}
                                    </h3>


                                    <p>Description: {item.description}</p>
                                    <div>
                                        <button
                                            className='quantity-button-decrement'
                                            onClick={() => {
                                                if (item.lineitem.quantity > 1) {
                                                    dispatch(updateQuantities(cart.id, UUID, accountId, item.id, 'decrement'));
                                                } else {
                                                    dispatch(removeItem(cart.id, item.id, accountId, UUID));
                                                }
                                            }}>
                                            -
                                        </button>
                                        <span>Quantity: {item.lineitem.quantity}</span>
                                        <button className='quantity-button-increment' onClick={() =>
                                            dispatch(updateQuantities(cart.id, UUID, accountId, item.id, 'increment'))
                                        }>
                                            +
                                        </button>
                                        <button className='button' onClick={() => dispatch(removeItem(cart.id, item.id, accountId, UUID))}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className='cart-container'>
                            <h1>Order Summary</h1>
                            <h3 className='column'>Subtotal: $ {cart.orderTotal}</h3>
                            <h3 className='column'>Shipping: $5.00</h3>
                            <h3 className='column'>Tax: 8.75%</h3>
                            <h3 className='column'>Total: {'$'} {((cart.orderTotal * 1.0875) + 5).toFixed(2)}</h3>


                            <div className='row'>
                                <Link to='/confirmation'>
                                    <button className='sign-up-button' onClick={() => {
                                        dispatch(checkout(UUID))
                                    }}>Checkout</button>
                                </Link>
                            </div>
                            <h3>Sign up for new album release and discounts!</h3>
                            <div className='row'>
                                <Link to='/account-nav/signup'>
                                    <button className='signup-button'>Sign Up</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div >
                    <h3>Your Cart is Empty!!</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;

// {auth.id ? (
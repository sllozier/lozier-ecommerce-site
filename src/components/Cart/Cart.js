import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, updateQuantities, removeLineItem, checkout } from '../../store/reducers1/cartReducer';

const Cart = () => {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.account);
    const cart = useSelector((state) => state.cart);
    console.log('AUTH', auth);
    console.log('CART', cart);

    let UUID = cart.UUID || 'empty';
    const accountId = auth.id || 0;
    if(accountId === 0 && UUID === 'empty' && localStorage.UUID !== undefined){
        UUID = localStorage.getItem('UUID');
    }
    const lineItems = cart.products || [];

    useEffect(() => {
        dispatch(fetchCart(accountId, UUID));
    }, [accountId]);
    
    return (
        <div>
            {lineItems ? (
                <div>
                    <div className='row'>
                        <h3>Cart or Bag or Whatever</h3>
                    </div>
                    <div className='row-lineItem'>
                        <div className='column'>
                            {lineItems.map((item) =>(
                                <div key={item.id} className='row-item'>
                                    <div className='column'>
                                        <Link to={`/products/${item.id}`}>
                                            <img className='album-img' src={item['imageUrl']}/>
                                        </Link>
                                    </div>
                                    <div className='column-heading'>
                                        <div className='row'>
                                            <div className='column'>
                                                {item['title']}
                                            </div>{' '}
                                            <div className='column'>
                                                {$} {item['price']}
                                            </div>
                                        </div>
                                        <div className='row'>
                                         <p>Description: {item.description}</p>   
                                        </div>
                                        <div className='row'>
                                            <div className='column'>
                                                <button
                                                className='quantity-button-decrement'
                                                onClick={() => {
                                                    if(item.lineItem.quantity > 1){
                                                        dispatch(updateQuantities(cart.id, UUID, accountId, item.id, 'decrement'));
                                                    }else{
                                                        dispatch(removeItem(cart.id, item.id, accountId, UUID));
                                                    }
                                                }}>
                                                    -
                                                </button>
                                                <span>Quantity: {item.lineItem.quantity}</span>
                                                <button className='quantity-button-increment' onClick={() =>
                                                dispatch(updateQuantities(cart.id, UUID, accountId, item.id, 'increment'))
                                            }>
                                                +
                                            </button>
                                            </div>
                                            <div className='column'>
                                                <i className='trash-can' onClick={() => dispatch(removeItem(cart.id, item.id, accountId, UUID))}>                                          
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='column-summary'>
                            <h1>Cart or Order Summary?</h1>
                            <div className='row'>
                                <div className='column'>Subtotal:</div>
                                <div className='column'>{'$'} {cart.orderTotal}</div>
                            </div>
                            <div className='row'>
                            <div className='column'>Shipping:</div>
                            <div className='column'>$5.00</div>
                            </div>
                            <div className='row'>
                            <div className='column'>Tax:</div>
                            <div className='column'>8.75%</div>
                            </div>
                            <div className='row-total'>
                            <div className='column'>Total:</div>
                            <div className='column'>{'$'} {cart.orderTotal + 5 + (cart.orderTotal + 5) * 0.0875}</div>
                            </div>
                            {auth.id ? (
                                <div className='row'>
                                    <Link to='/confirmation'>
                                    <button className='sign-up-button' onClick={() => {
                                        if(accountId !== 0){
                                            dispatch(checkout(UUID));
                                        }
                                    }}>Checkout</button>
                                    </Link>
                                </div>
                            ):(
                                <div className='row'>
                                    <Link to='/account-nav/signup'>
                                        <button className='signup-button'>Sign Up</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ): (
                <div >
                    <h3>Your Cart is Empty!!</h3>
                </div>
            )}
        </div>
    );
};

export default Cart
import axios from 'axios';
import  history from '../../utils/history';

const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';

const getCart = (cart) => {
    return {
        type: GET_CART,
        cart,
    };
};

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};

export const createCart = (productId, accountId, UUID) => {
    return async(dispatch) => {
        try{
            console.log('UUID', UUID, 'ACCT ID', accountId, 'Item Id', productId);
            const {data}  = await axios.post(`/api/cart`, { productId, accountId, UUID });
            console.log('CREATE CART DATA', data)
            if(accountId === 0){
                localStorage.setItem('UUID', data.UUID)
            }
            dispatch(updateQuantities(data.id, data.UUID, accountId, productId, 'increment'));
        }catch(error){
            console.log('CREATE CART THUNK ERROR ', error);
        }
    }
};

export const fetchCart = (accountId, UUID) => {
    return async(dispatch) => {
        try{
            const { data } = await axios.get(`/api/cart/${accountId}/${UUID}`);
            dispatch(getCart(data));
        }catch(error){
            console.log('FETCH CART THUNK ERROR ', error);
        }
    }
};

export const accountAttachCart = (accountId, UUID) => {
    return async(dispatch) => {
        try{
            await axios.put(`/api/cart/attach/${accountId}`, {UUID})
            dispatch(fetchCart(accountId, UUID));
        }catch(error){
            console.log('ATTACH CART THUNK ERROR ', error)
        }
    };
}

export const removeItem = (cartId, productId, accountId, UUID) => {
    return async(dispatch) => {
        try{
            const { data } = await axios.delete(`/api/cart/${productId}/${UUID}`);
            const numberToRemove = data.products[0].lineItem.quantity
            dispatch(updateQuantities(cartId, UUID, accountId, productId, 'remove', numberToRemove));
        }catch(error){
            console.log('REMOVE ITEM THUNK ERROR ', error);
        }
    }
};


export const checkout = (UUID) => {
    return async(dispatch) => {
        try{
            await axios.put(`/api/cart/${UUID}`);
            history.push('/confirmation')
            dispatch(clearCart());
        }catch(error){
            console.log('CHECKOUT THUNK ERROR ', error);
        }
    }
};

export const updateQuantities = (cartId, UUID, accountId, productId, op, num=1)=> {
    return async(dispatch) => {
        try{
            console.log('UPDATE QTY ACCT', accountId)
            await axios.put('/api/cart', {cartId, UUID, productId, op, num})
            dispatch(fetchCart(accountId, UUID));
        }catch(error){
            console.log('UPDATE QUANTITIES THUNK ERROR ', error)
        }
    }
}

export default function cartReducer(state={}, action) {
    switch(action.type){
        case GET_CART:
            return action.cart;
        case CLEAR_CART:
            return {};
        default:
            return state;
    }
};
 

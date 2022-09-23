import axios from 'axios';
import  history from '../../utils/history';

const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';

const fetchedCart = (cart) => {
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

export const createCart = (itemId, accountId, UUID) => {
    return async(dispatch) => {
        try{
            const { data } = await axios.post(`/api/cart`, { itemId, accountId, UUID });
            if(accountId === 0){
                localStorage.setItem('UUID', data.UUID)
            }
            dispatch(updateQuantities(data.id, data.UUID, accountId, itemId));
        }catch(error){
            console.log('CREATE CART THUNK ERROR ', error);
        }
    }
};

export const fetchCart = (accountId, UUID) => {
    return async(dispatch) => {
        try{
            const { data } = await axios.get(`/api/cart/${accountId}/${UUID}`);
            dispatch(fetchedCart(data));
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

export const removeItem = (cartId, itemId, accountId, UUID) => {
    return async(dispatch) => {
        try{
            const { data } = await axios.delete(`/api/cart/${itemId}/${UUID}`);
            const numberToRemove = data.products[0].lineItems.quantity
            dispatch(updateQuantities(cartId, UUID, accountID, itemID, 'remove', numberToRemove));
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

export default cartReducer = (state={}, action) => {
    switch(action.type){
        case GET_CART:
            return action.cart;
        case CLEAR_CART:
            return {};
        default:
            return state;
    }
};
 

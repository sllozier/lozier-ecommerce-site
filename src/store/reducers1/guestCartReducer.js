import axios from 'axios';

const SET_GUESTCART = 'SET_GUESTCART';
const ADD_TO_GUESTCART = 'ADD_TO_GUESTCART';
const DELETE_FROM_GUESTCART = 'DELETE_FROM_GUESTCART';
const EDIT_GUESTCART = 'EDIT_GUESTCART';

export const addGuestCart = (guestCart) => {
    return {
        type: ADD_TO_GUESTCART,
        guestCart,
    };
};

// export const addToGuestCart = (guestCart) => {
//     return {
//         type: ADD_TO_GUESTCART,
//         guestCart
//     }
// }



// history
export const addToGuestCartThunk = (guestCart) => {
    return async (dispatch) => {
        try {
            await axios.post('/api/orders/guest', guestCart)
            localStorage.setItem('cart', [])
            dispatch(addGuestCart(guestCart))
            // history.push('/confirmation')
        } catch (error) {
            console.log('GUEST CART TUNK ERROR ', error);
        }
    };
};

export const guestCartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_GUESTCART:
            return [...state, action.guestCart];
        default:
            return state;
    };
};
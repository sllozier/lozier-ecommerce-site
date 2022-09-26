import axios from 'axios';


const MAKE_GUESTCART = 'MAKE_GUESTCART'
const ADD_TO_GUESTCART = 'ADD_TO_GUESTCART'
const DELETE_ITEM_GUESTCART = 'DELETE_ITEM_GUESTCART'
const UPDATE_QUANTITIES = 'UPDATE_QUANTITIES'
// const EDIT_GUESTCART = 'EDIT_GUESTCART';

const makeGuestCart = (cartArr) => {
    return {
        type: MAKE_GUESTCART,
        cartArr
    }
}

export const addGuestCart = (guestCart, qty) => {
    return {
        type: ADD_TO_GUESTCART,
        guestCart,
        qty
    };
};

export const makeGuestCartThunk = (guestCart) => {
    return async (dispatch) => {
        try {
            await axios.post('/api/cart', guestCart)
            const lineitems = await axios.get('/api/cart')
            const lineitemsQty = await axios.get('/api/cart/line-item-qty')
            localStorage.setItem('cart', [])
            dispatch(addGuestCart(lineitems.data, lineitemsQty.data))
            // dispatch(setGuestCart([]))
            // history.push('/confirmation')
        } catch (error) {
            console.log('GUEST CART TUNK ERROR ', error);
        }
    }
}



export default function guestCartReducer (state = [], action) {
    switch (action.type) {
        case ADD_TO_GUESTCART:
            const guestCartQty = action.guestCart.map((item) => {
                console.log(item.productId, action.qty[item.productId])
                item.quantity = action.qty[item.productId]
                return item
            })
            // guestCartQty.filter(e => e.productId === 1)

            // guestCartQty.find((element, idx, arr) => {
            //     arr = 
            // })
            // console.log(guestCartQty.find(element => element.productId === element.productId))
            // guestCartQty.reduce((accum, element, idx, arr) => {
            //     if (!accum.length) {
            //         accum.push(element)
            //         return accum
            //     } else if (accum.filter(e => e.productId)) {
            //         return accum
            //     } else {
            //         console.log(accum)
            //         accum.push(element)
            //         return accum
            //     }
            //     console.log(arr.indexOf(element.productId))
            //     // }
            //     // return accum
            // }, [])

            console.log(guestCartQty)
            return guestCartQty
        case MAKE_GUESTCART:
            return [...state, ...cartArr]
        default:
            return state
    }
}


// // export const addGuestCart = (guestCart) => {
// //     return {
// //         type: ADD_TO_GUESTCART,
// //         guestCart,
// //     };
// // };

// export const setGuestCart = (guestCart) => {
//     return {
//         type: SET_GUESTCART,
//         guestCart
//     }
// }

// export const addToGuestCart = (guestCartItem) => {
//     return {
//         type: ADD_TO_GUESTCART,
//         guestCartItem
//     }
// }


// // history
// export const createToGuestCartThunk = (guestCart, history) => {
//     return async (dispatch) => {
//         try {
//             await axios.post('/api/orders/guest', guestCart)
//             localStorage.setItem('cart', [])
//             // dispatch(addGuestCart(guestCart))
//             dispatch(setGuestCart([]))
//             // history.push('/confirmation')
//         } catch (error) {
//             console.log('GUEST CART TUNK ERROR ', error);
//         }
//     };
// };


// export const guestCartReducer = (state = [], action) => {
//     switch (action.type) {
//         case ADD_TO_GUESTCART:
//             let dupe = false
//             let guestCart = state.map((item) => {
//                 if (item.productId === action.guestCartItem.productId) {
//                     dupe = true
//                     return { ...item, quantity: item.quantity += action.guestCartItem.quantity }
//                 } else {
//                     return item
//                 }
//             })
//             if (!dupe) {
//                 guestCart.push(action.guestCartItem)
//             }
//             localStorage.setItem('guestCart', JSON.stringify(guestCart))
//             return guestCart;
//         case SET_GUESTCART:
//             return action.guestCart
//         default:
//             return state;
//     };
// };
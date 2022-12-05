import { createSlice } from "@reduxjs/toolkit";
import * as bulmaToast from 'bulma-toast';
import axios from 'axios';

bulmaToast.setDefaults({
    position:'top-center',
    duration: 1600,
    pauseOnHover: true,
    type: 'is-warning',
    animate: {in: 'fadeIn'},
})



const orderSlice = createSlice({
    name: "orderSlice",
    initialState: {
        orderList: [],
        orderData: {},
        lineItems: [],
        lineItem: {},
    },
    reducers: {
        setOrderData: (state, action) => {
            return action.payload;
        },
        getOrderList: (state, action) => {
           if(!action.orderList) return state;
           return action.orderList;
        },
        // getOrderData: (state, action) => {
        //     state.orderData = action.payload;
        //     return state;
        // },
        addItem: (state) => {
            return state.map(order => order.complete
                ? order : lineItems.push(action.payload));
        },
        removeItem: (state, action) => {
            return state.map(order => order.complete
                ? order : lineItems.filter(item => item.id !== action.itemId));
        },
        _updateQuantity: (state, action) => {
            const orderToUpdate = state.orderList.filter(order => !order.complete);
            const itemToUpdate = orderToUpdate.lineItems.filter(item => item.id === action.itemId);
            if(action.num <= 0 || action.num > orderToUpdate.itemToUpdate.product.stock)
            return state;
            const nextState = JSON.parse(JSON.stringify(state));
            nextState.lineItems.quantity = action.num;
            return nextState;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
            return state;
        },
    },
});

export default orderSlice.reducer;
export const {
    setOrders,
    getOrderList,
    //getOrderData,
    addItem,
    removeItem,
    _updateQuantity,
    setErrorMsg,
} = orderSlice.actions;

//thunks go here//

export const fetchOrderList = accountId => async(dispatch) => {
    try{
        const token = window.localStorage.getItem('token');
        const order = window.localStorage.getItem('order');
        if(token){
            const { data: orderList } = await axios.get(`/api/orders/${accountId}`, {
                headers: {
                    authorization: token,
                },
            });
            dispatch(setOrders(orderList));
            if (order) {
                JSON.parse(order).lineItems.forEach(item => {
                    dispatch(addOrderItem(item.product.id));
                });
                window.localStorage.removeItem('order');
            }
        }else{
            if(!order)
            window.localStorage.setItem('order',
            JSON.stringify({
                complete: false,
                lineItems: [],
            })
            );
        }        
    }catch(error){
        console.error("FETCH ORDER LIST ERROR", error);
    }
};

export const addOrderItem = productId => async(dispatch) => {
    try{
        const token = window.localStorage.getItem('token');
        if(token){
            const { data: itemData } = await axios.put(`/api/orders/${productId}`, {}, {
                headers: {
                    authorization: token,
                },
            });
            dispatch(addItem(itemData));
        }else{
            const order = window.localStorage.getItem('order');
            const { data: itemData } = await axios.get(`/api/albums/${productId}`);
            const newOrder = JSON.parse(order);
            if(newOrder.lineItems.some(item => item.product.id === itemData.id))
            throw new Error('Item already exists in order');
        const item = {
            id: newOrder.lineItems.length + 1,
            quantity: 1,
            product: itemData,
        };
        newOrder.lineItems.push(item);
        localStorage.order = JSON.stringify(newOrder);
        dispatch(addItem(item));
        }
    }catch(error){
       bulmaToast({
        message: error.response ? error.response.data : error.message
       });
    }
};

export const removeOrderItem = itemId => async(dispatch) => {
    try{
        const token = window.localStorage.getItem('token');
        if(token){
            await axios.delete(`/api/orders/${itemId}`, {
                headers: {
                    authorization: token,
                },
            });
            dispatch(removeItem(itemId));
        } else {
            const order = window.localStorage.getItem('order');
            const newOrder = JSON.parse(order);
            newOrder.lineItems = newOrder.lineItems.filter(item => item.id !== itemId);
            localStorage.order = JSON.stringify(newOrder);
            dispatch(removeItem(itemId));
        }
    }catch(error){
        console.error(error);
    }
};

export const updateQuantity = (itemId, num) => async(dispatch) => {
    try{
        const token = window.localStorage.getItem('token');
        if(token){
            await axios.put(`/orders/qty`, { itemId, num }, {
                headers: {
                    authorization: token,
                },
            });
            dispatch(_updateQuantity(itemId,num));
        }else{
            const order = window.localStorage.getItem('order');
            const newOrder = JSON.parse(order);
            if(num < 1) throw new Error('Quantity cannot be less than 1');
            if(num > newOrder.lineItems[itemId -1].product.stock)
                throw new Error('Quantity cannot be more than amount in stock');
            newOrder.lineItems[itemId - 1].quantity = num;
            localStorage.order = JSON.stringify(newOrder);
            dispatch(_updateQuantity(itemId, num));
        }
    }catch(error){
        bulmaToast({
            message: error.response ? error.response.data : error.message
           });
    }
};

// export const fetchOrderData = (orderId) => async(dispatch) => {
//     try{
//         const { data: orderData } = await axios.get(`/api/orders/${orderId}`);
//         dispatch(getOrderData(orderData));
//     }catch(error){
//         console.log("FETCH ORDER DATA ERROR", error);
//     }
// };
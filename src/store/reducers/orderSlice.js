import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const orderSlice = createSlice({
    name: "orderSlice",
    initialState: {
        orderList: [],
        orderData: {},
    },
    reducers: {
        getOrderList: (state, action) => {
            state.orderList = action.payload;
            return state;
        },
        getOrderData: (state, action) => {
            state.orderData = action.payload;
            return state;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
            return state;
        },
    },
});

export default orderSlice.reducer;
export const {
    getOrderList,
    getOrderData,
    setErrorMsg,
} = orderSlice.actions;

//thunks go here//

export const fetchOrderList = () => async(dispatch) => {
    try{
        const { data: orderList } = await axios.get("/api/orders");
        dispatch(getOrderList(orderList));
    }catch(error){
        console.log("FETCH ORDER LIST ERROR", error);
    }
};

export const fetchOrderData = (orderId) => async(dispatch) => {
    try{
        const { data: orderData } = await axios.get(`/api/orders/${orderId}`);
        dispatch(getOrderData(orderData));
    }catch(error){
        console.log("FETCH ORDER DATA ERROR", error);
    }
};
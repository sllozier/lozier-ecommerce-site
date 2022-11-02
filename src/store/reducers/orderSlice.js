import { createSlice } from "@reduxjs/toolkit";
const axios = require('axios');

const orderSlice = createSlice({
    name: "orderSlice",
    initialState: {
        orderList: [],
        orderData: {},
    },
    reducers: {
        
    }
});

export default orderSlice.reducer;
export const {

} = orderSlice.actions;

//thunks go here//
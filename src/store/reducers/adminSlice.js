import { createSlice } from "@reduxjs/toolkit";
const axios = require('axios');

const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {
        adminList: [],
        adminData: {},
        userList: [],
        userData: {},
        productList: [],
        productData:{},
        orderList: [],
        orderData: {},
    },
    reducers: {
        
    }
});

export default adminSlice.reducer;
export const {

} = adminSlice.actions;

//thunks go here//
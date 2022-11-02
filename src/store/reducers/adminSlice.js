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
        getAdminList: (state, action) => {
            state.adminList = action.payload;
            return state;
        },
        getAdminData: (state, action) => {
            state.adminData = action.payload;
            return state;
        },
        _deleteAdmin: (state, action) => {
            state.adminList = state.adminList.filter((admin) =>
            admin.id !== action.payload.id
            );
            return state;
        },
        getUserList: (state, action) => {
            state.userList = action.payload;
            return state;
        },
        getUserData: (state, action) => {
            state.userData = action.payload;
            return state;
        },
        _deleteUser: (state, action) => {
            state.userList = state.userList.filter((user) =>
            user.id !== action.payload.id
            );
            return state;
        },
        getProductList: (state, action) => {
            state.productList = action.payload;
            return state;
        },
        getProductData: (state, action) => {
            state.productData = action.payload;
            return state;
        },
        addProduct: (state, action) => {
            state.productList.push(action.payload);
            return state;
        },
        _deleteProduct: (state, action) => {
            state.productList = state.productList.filter((product) =>
            product.id !== action.payload.id
            );
            return state;
        },
        getOrderList: (state, action) => {
            state.orderList = action.payload;
            return state;
        },
        getOrderData: (state, action) => {
            state.orderData = action.payload;
            return state;
        },
        addOrder: (state, action ) => {
            state.orderList.push(action.payload);
            return state;
        },
        _deleteOrder: (state, action) => {
            state.orderList = state.orderList.filter((order) =>
            order.id !== action.payload.id
            );
            return state;
        },
    }
});

export default adminSlice.reducer;
export const {
    getAdminList,
    getAdminData,
    _deleteAdmin,
    getUserList,
    getUserData,
    _deleteUser,
    getProductList,
    getProductData,
    addProduct,
    _deleteProduct,
    getOrderList,
    getOrderData,
    addOrder,
    _deleteOrder,
} = adminSlice.actions;

//thunks go here//
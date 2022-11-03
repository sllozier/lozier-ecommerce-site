import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

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
        _addProduct: (state, action) => {
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
        _addOrder: (state, action ) => {
            state.orderList.push(action.payload);
            return state;
        },
        _deleteOrder: (state, action) => {
            state.orderList = state.orderList.filter((order) =>
            order.id !== action.payload.id
            );
            return state;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
            return state;
        },
    },
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
    _addProduct,
    _deleteProduct,
    getOrderList,
    getOrderData,
    _addOrder,
    _deleteOrder,
    setErrorMsg,
} = adminSlice.actions;

//thunks go here//

export const fetchAdmins = () => async(dispatch) => {
    try{
        const { data: adminList } = await axios.get("/api/admin");
        dispatch(getAdminList(adminList));
    }catch(error){
        console.log('FETCH ADMINS ERROR', error);
    }
};

export const fetchAdminData = (adminId) => async(dispatch) => {
    try{
        const token = window.localStorage.getItem("token");
        const { data: adminData } = await axios.get(`/api/admin/${adminId}`, {
            headers: {
                authorization: token
            },
        });
        dispatch(getAdminData(adminData));
    }catch(error){
        console.log("FETCH ADMIN DATA ERROR", error);
    }
};

export const deleteAdmin = (adminId) => async(dispatch) => {
    try{
        const { data: deletedAdmin } = await axios.delete(`/api/admin/${adminId}`);
        dispatch(_deleteAdmin(deletedAdmin));
        dispatch(logout());
    }catch(error){
        console.log("DELETE ADMIN ERROR", error);
    }
};

export const updateAdminData = (updatedAdmin, adminId) => async(dispatch) => {
    try{
        const { data: updatedAdminData } = await axios.put(`/api/admin/${adminId}`, updatedAdmin);
        dispatch(getAdminData(updatedAdminData));
    }catch(error){
        console.log("UPDATE ADMIN ERROR", error);
    }
};

export const fetchUsers = (adminId) => async(dispatch) => {
    try{
        const { data: userList } = await axios.get(`/api/admin/${adminId}/users`);
        dispatch(getUserList(userList));
    }catch(error){
        console.log("FETCH USERS ERROR", error);
    }
};

export const fetchUserData = (adminId, userId) => async(dispatch) => {
    try{
        const { data: userData } = await axios.get(`/api/admin/${adminId}/users/${userId}`, adminId, userId);
        dispatch(getUserData(userData));
    }catch(error){
        console.log("FETCH USER DATA ERROR", error);
    }
};

export const deleteUser = (userId) => async(dispatch) => {
    try{
        const { data: deletedUser } = await axios.delete(`/api/admin/:id/users/${userId}`);
        dispatch(_deleteUser(deletedUser));
    }catch(error){
        console.log("DELETE USER ERROR", error);
    }
};

export const updateUserData = (updatedUser, adminId, userId) => async(dispatch) => {
    try{
        const { data: updatedUserData } = await axios.put(`/api/admin/${adminId}/users/${userId}`, updatedUser, adminId, userId);
        dispatch(getUserData(updatedUserData));
    }catch(error){
        console.log("UPDATE USER ERROR", error);
    }
};

export const fetchProducts = (adminId) => async(dispatch) => {
    try{
        const { data: productList } = await axios.get(`/api/admin/${adminId}/products`);
        dispatch(getProductList(productList));
    }catch(error){
        console.log("FETCH PRODUCTS ERROR", error);
    }
};

export const fetchProductData = (adminId, productId) => async(dispatch) => {
    try{
        const { data: productData } = await axios.get(`/api/admin/${adminId}/products/${productId}`, adminId, productId);
        dispatch(getProductData(productData));
    }catch(error){
        console.log("FETCH PRODUCT DATA ERROR", error);
    }
};

export const addProduct = (newProduct, adminId) => async(dispatch) => {
    try{
        const { data: newProductData } = await axios.post(`/api/admin/${adminId}/products`, newProduct);
        dispatch(_addProduct(newProductData));
    }catch(error){
        console.log("ADD PRODUCT ERROR", error);
    }
};

export const deleteProduct = (productId) => async(dispatch) => {
    try{
        const { data: deletedProduct } = await axios.delete(`/api/admin/:id/products/${productId}`);
        dispatch(_deleteProduct(deletedProduct));
    }catch(error){
        console.log("DELETE PRODUCT ERROR", error);
    }
};

export const updateProductData = (updatedProduct, adminId, productId) => async(dispatch) => {
    try{
        const { data: updatedProductData } = await axios.put(`/api/admin/${adminId}/products/${productId}`, updatedProduct, adminId, productId);
        dispatch(getProductData(updatedProductData));
    }catch(error){
        console.log("UPDATE PRODUCT ERROR", error);
    }
};

export const fetchOrders = (adminId) => async(dispatch) => {
    try{
        const { data: orderList } = await axios.get(`/api/admin/${adminId}/orders`);
        dispatch(getOrderList(orderList));
    }catch(error){
        console.log("FETCH ORDERS ERROR", error);
    }
};

export const fetchOrderData = (adminId, orderId) => async(dispatch) => {
    try{
        const { data: orderData } = await axios.get(`/api/admin/${adminId}/orders/${orderId}`, adminId, orderId);
        dispatch(getOrderData(orderData));
    }catch(error){
        console.log("FETCH ORDER DATA ERROR", error);
    }
};

export const addOrder = (newOrder, adminId) => async(dispatch) => {
    try{
        const { data: newOrderData } = await axios.post(`/api/admin/${adminId}/orders`, newOrder);
        dispatch(_addOrder(newOrderData));
    }catch(error){
        console.log("ADD ORDER ERROR", error);
    }
};

export const deleteOrder = (orderId) => async(dispatch) => {
    try{
        const { data: deletedOrder } = await axios.delete(`/api/admin/:id/orders/${orderId}`);
        dispatch(_deleteOrder(deletedOrder));
    }catch(error){
        console.log("DELETE ORDER ERROR", error);
    }
};

export const updateOrderData = (updatedOrder, adminId, orderId) => async(dispatch) => {
    try{
        const { data: updatedOrderData } = await axios.put(`/api/admin/${adminId}/orders/${orderId}`, updatedOrder, adminId, orderId);
        dispatch(getOrderData(updatedOrderData));
    }catch(error){
        console.log("UPDATE ORDER ERROR", error);
    }
};
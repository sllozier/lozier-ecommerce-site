import { createSlice } from "@reduxjs/toolkit";
const axios = require('axios');

const authSlice = createSlice({
    name: "authSlice",
    initialState: {},
    reducers: {
        setAuth: (state, action) => {
            return action.payload
        },
        logout: (state, action) => {
            localStorage.removeItem('token');
            return {};
        }
    }
});

export default authSlice.reducer;
export const {

} = authSlice.actions;

//thunks go here//
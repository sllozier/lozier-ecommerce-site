import { createSlice } from "@reduxjs/toolkit";
const axios = require('axios');

const albumSlice = createSlice({
    name: "albumSlice",
    initialState: {
        albumList: [],
        albumData: {},
    },
    reducers: {
        
    }
});

export default albumSlice.reducer;
export const {

} = albumSlice.actions;

//thunks go here//
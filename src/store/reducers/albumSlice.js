import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const albumSlice = createSlice({
    name: "albumSlice",
    initialState: {
        albumList: [],
        albumData: {},
    },
    reducers: {
        getAlbumList: (state, action) => {
            state.albumList = action.payload;
            return state;
        },
        getAlbumData: (state, action) => {
            state.albumData = action.payload;
            return state;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
            return state;
        },
    },
});

export default albumSlice.reducer;
export const {
    getAlbumList,
    getAlbumData,
    setErrorMsg,
} = albumSlice.actions;

//thunks go here//

export const fetchAlbums = () => async(dispatch) => {
    try{
        const { data: albumList } = await axios.get('/api/albums');
        dispatch(getAlbumList(albumList));
    }catch(error){
        console.log("FETCH ALBUMS ERROR", error);
    }
};

export const fetchAlbumData = (albumId) => async(dispatch) => {
    try{
        const { data: albumData } = await axios.get(`/api/albums/${albumId}`);
        dispatch(getAlbumData(albumData));
    }catch(error){
        console.log("FETCH ALBUM DATA ERROR", error);
    }
};
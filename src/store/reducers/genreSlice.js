import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const genreSlice = createSlice({
    name: "genreSlice",
    initialState: {
        genreList: [],
        genreData: {},
    },
    reducers: {
        getGenreList: (state, action) => {
            state.genreList = action.payload;
            return state;
        },
        getGenreData: (state, action) =>{
            state.genreData = action.payload;
            return state;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
            return state;
        },
    },
});

export default genreSlice.reducer;
export const {
    getGenreList,
    getGenreData,
    setErrorMsg,
} = genreSlice.actions;


export const fetchGenreList = () => async(dispatch) => {
    try{
        const { data: genreList } = await axios.get("/api/genres");
        dispatch(getGenreList(genreList));
    }catch(error){
        console.log("FETCH GENRE LIST ERROR", error);
    }
};

export const fetchGenreData = (genreId) => async(dispatch) => {
    try{
        const { data: genreData } = await axios.get(`/api/genres/${genreId}`);
        dispatch(getGenreData(genreData));
    }catch(error){
        console.log("FETCH GENRE DATA ERROR", error);
    }
};
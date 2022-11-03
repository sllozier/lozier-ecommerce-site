import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loggerMiddleware from "redux-logger";
import accountReducer from "./reducers/accountSlice";
import adminReducer from "./reducers/adminSlice";
import albumReducer from "./reducers/albumSlice";
import authReducer from "./reducers/authSlice";
import cartReducer from "./reducers/cartSlice";
import orderReducer from "./reducers/orderSlice";
import genreReducer from "./reducers/genreSlice";

export default configureStore ({
    reducer: {
       account: accountReducer,
       admin: adminReducer,
       album: albumReducer,
       auth: authReducer,
       cart: cartReducer,
       order: orderReducer,
       genre: genreReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(loggerMiddleware),
});
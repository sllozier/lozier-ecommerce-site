import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from "redux-logger";
import accountReducer from "./reducers/accountSlice";
import adminReducer from "./reducers/adminSlice";
import albumReducer from "./reducers/albumSlice";
import authReducer from "./reducers/authSlice";
import cartReducer from "./reducers/cartSlice";
import orderReducer from "./reducers/orderSlice";
import genreReducer from "./reducers/genreSlice";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

 const rootReducer = combineReducers ({
       account: accountReducer,
       admin: adminReducer,
       album: albumReducer,
       auth: authReducer,
       cart: cartReducer,
       order: orderReducer,
       genre: genreReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger),
});

export const persistor = persistStore(store);
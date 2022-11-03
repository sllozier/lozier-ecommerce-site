import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import reducers here
import accountsReducer from './accountsReducer'
import productsReducer from './productsReducer'
import  authReducer  from "./authReducer";
import  guestCartReducer  from './guestCartReducer';
import  albumReducer  from './albumReducer';
import  adminReducer  from './adminReducer';
import cartReducer from './cartReducer';
import singleAlbumReducer from './singleAlbumReducer';



const rootReducer = combineReducers({
    accounts: accountsReducer,
    products: productsReducer,
    albums: albumReducer,
    account: authReducer,
    guestCart: guestCartReducer,
    admin: adminReducer,
    cart: cartReducer,
    singleAlbum: singleAlbumReducer,
   
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)



import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import reducers here
import accountsReducer from './reducers1/accountsReducer'
import productsReducer from './reducers1/productsReducer'
import { authReducer } from "./reducers1/authReducer";
import { guestCartReducer } from './reducers1/guestCartReducer';
import { albumReducer } from './reducers2/albumReducer';



const rootReducer = combineReducers({
    accounts: accountsReducer,
    products: productsReducer,
    albums: albumReducer,
    account: authReducer,
    guestCart: guestCartReducer,
   
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)



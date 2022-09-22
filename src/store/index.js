import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import reducers here
import accountReducer from './reducers1/accountReducer'
import productReducer from './reducers1/productReducer'
import { authReducer } from "./reducers1/authReducer";
import { guestCartReducer } from './reducers1/guestCartReducer';
import { albumReducer } from './reducers2/albumReducer';



const rootReducer = combineReducers({
    accounts: accountReducer,
    products: productReducer,
    albums: albumReducer,
    account: authReducer,
    guestCart: guestCartReducer,
   
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)



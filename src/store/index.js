import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import reducers here
import accountReducer from './reducers1/accountReducer'
import productReducer from './reducers1/productReducer'
import { authReducer } from "./reducers1/authReducer";
import { albumReducer } from './reducers2/albumReducer';


const rootReducer = combineReducers({
    accounts: accountReducer,
    products: productReducer,
    albums: albumReducer,
    auth: authReducer
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)



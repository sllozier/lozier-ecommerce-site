import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
//import reducers here
import accountReducer from './reducers1/accountReducer'
import productReducer from './reducers1/productReducer'


const rootReducer = combineReducers({
    accounts: accountReducer,
    products: productReducer
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)

)

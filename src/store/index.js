import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
//import reducers here
import accountReducer from './reducers1/accountReducer'


const rootReducer = combineReducers({
    accounts: accountReducer
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)

)

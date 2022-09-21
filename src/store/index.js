import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import reducers here
import accountReducer from './reducers1/accountReducer'
import { authReducer } from "./reducers1/authReducer";
import { guestCartReducer } from './reducers1/guestCartReducer';
import { albumReducer } from './reducers2/albumReducer';


const rootReducer = combineReducers({
    accounts: accountReducer,
    albums: albumReducer,
    auth: authReducer,
    guestCart: guestCartReducer
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)



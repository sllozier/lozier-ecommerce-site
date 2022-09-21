import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import reducers here
import accountReducer from './reducers1/accountReducer';
import { albumReducer } from './reducers2/albumReducer';

const rootReducer = combineReducers({
  accounts: accountReducer,
  albums: albumReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

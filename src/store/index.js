import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
//import reducers here


const rootReducer = combineReducers({
    //reducers go here
})

export const store = createStore(
   rootReducer,
   applyMiddleware(thunk)
    
)

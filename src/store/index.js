import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import { campusesReducer } from './campusesReducer';
import { singleCampusReducer } from "./singleCampusReducer";
import { studentsReducer } from "./studentsReducer";
import { singleStudentReducer } from "./singleStudentReducer";

const rootReducer = combineReducers({
    campuses: campusesReducer,
    campus: singleCampusReducer,
    students: studentsReducer,
    student: singleStudentReducer,
})

export const store = createStore(
   rootReducer,
   applyMiddleware(thunk)
    
)

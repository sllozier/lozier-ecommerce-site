import axios from 'axios';

const SET_CAMPUSES = "SET_CAMPUSES";
const ADD_CAMPUS = "ADD_CAMPUS";
const DELETE_CAMPUS = "DELETE_CAMPUS";
const CLEAR_CAMPUS = "CLEAR_CAMPUS";



export const setCampuses = (data) => {
  return{
    type: SET_CAMPUSES,
    campuses: data,
  };
};


export const addCampus = (campus) => {
  return {
    type: ADD_CAMPUS,
    campus,
  };
};


export const deleteCampus = (campus) => {
  return{
    type: DELETE_CAMPUS,
    campus,
  };
};


export const clearCampus = () => {
  return{
    type: CLEAR_CAMPUS,
    campus: null,
  };
};




export const fetchAllCampuses = () => {
  return async (dispatch) => {
    try{
      const campuses = await axios.get('/api/campuses');
      dispatch(setCampuses(campuses.data));
    }catch(error){
      console.log('FETCH CAMPUS THUNK ERROR: ', error);
    }
  };
};


export const addNewCampus = (campus) => {
  return async (dispatch) => {
    try{
      const newCampus  = await axios.post('/api/campuses', campus)
      dispatch(addCampus(newCampus.data));
    }catch(error){
      console.log('ADD CAMPUS THUNK ERROR: ', error)
    }
  };
};


export const deleteThisCampus = (id) => {
    
  return async (dispatch) => {
    try{
      const deletedCampus = await axios.delete(`/api/campuses/${id}`);
      dispatch(deleteCampus(deletedCampus.data))
    }catch(error){
      console.log('DELETE CAMPUS THUNK ERROR: ', error)
    }
  };
};



export const campusesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    case ADD_CAMPUS:
      return [...state, action.campus];
    case DELETE_CAMPUS:
      return state.filter((campus) => campus.id !== action.campus.id);
    case CLEAR_CAMPUS:
      return action.campus;
    default:
      return state;
  }
}


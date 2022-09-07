import axios from 'axios';


const SET_CAMPUS = "SET_CAMPUS";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";
const REMOVE_STUDENT = "REMOVE_STUDENT";



export const setCampus = (campus) => {
    return{
      type: SET_CAMPUS,
      campus,
    };
  };
  
  export const updateCampus = (campus) => {
    return{
      type: UPDATE_CAMPUS,
      campus,
    };
  };

  export const removeStudent = (student) => {
    return{
      type: REMOVE_STUDENT,
      student,
    };
  };
  
  export const fetchOneCampus = (campusId) => {
    return async (dispatch) => {
      try{
        const { data: campus }  = await axios.get(`/api/campuses/${campusId}`);
        dispatch(setCampus(campus));
      }catch(error){
        console.log('FETCH CAMPUS THUNK ERROR: ', error);
      }
    };
  };
  
  
  export const updateThisCampus = (campus) => {
    return async (dispatch) => {
      try{
        const { data: updatedCampus } = await axios.put(`/api/campuses/${campus.id}`, campus);
        dispatch(updateCampus(updatedCampus));
      }catch(error){
        console.log('UPDATE CAMPUS THUNK ERROR: ', error);
      }
    }
  }
  
  export const singleCampusReducer = (state = {}, action) => {
    switch (action.type) {
      case SET_CAMPUS:
        console.log('CAMPUSSTATE1', action.campus)
        return action.campus;
      case UPDATE_CAMPUS:
        return action.campus;
      case REMOVE_STUDENT:
        console.log('CAMPUSSTATE2', state)
        console.log('NOTSTATE', !state)
        return {...state, campus: {...state.campus, students: state.students}};
      default:
        return state;
    }
  }
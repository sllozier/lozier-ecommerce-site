import axios from 'axios';


const SET_CAMPUS = "SET_CAMPUS";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";




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
  
  
  export const updateThisCampus = (campus, campusId) => {
    return async (dispatch) => {
      try{
        const { data: updatedCampus } = await axios.put(`/api/campuses/${campusId}`, campus);
        dispatch(updateCampus(updatedCampus));
      }catch(error){
        console.log('UPDATE CAMPUS THUNK ERROR: ', error);
      }
    };
  };

  
  
  export const singleCampusReducer = (state = {}, action) => {
    switch (action.type) {
      case SET_CAMPUS:
        return action.campus;
      case UPDATE_CAMPUS:
        return action.campus;
      default:
        return state;
    }
  }
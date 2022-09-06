import axios from 'axios';


const SET_STUDENT = "SET_STUDENT";
const UPDATE_STUDENT = "UPDATE_STUDENT";



export const setStudent = (data) => {
    return{
      type: SET_STUDENT,
      student: data,
    };
  };
  
  export const updateStudent = (student) => {
    return{
      type: UPDATE_STUDENT,
      student,
    };
  };
  

  
  export const fetchOneStudent = (studentId) => {
    return async (dispatch) => {
      try{
        const student  = await axios.get(`/api/students/${studentId}`);
        dispatch(setCampus(student.data));
      }catch(error){
        console.log('FETCH STUDENT THUNK ERROR: ', error);
      }
    };
  };
  
  
  export const updateThisStudent = (student) => {
    return async (dispatch) => {
      try{
        const { data: updatedStudent } = await axios.put(`/api/students/${student.id}`, student);
        dispatch(updateStudent(updatedStudent));
      }catch(error){
        console.log('UPDATE STUDENT THUNK ERROR: ', error);
      }
    }
  }

  export const unenrollThisStudent = (student) => {
    return async (dispatch) => {
        try{
            const { data: unenrolledStudent } = await axios.put(`/api/students/${student.id}`, student);
            dispatch(updateStudent(unenrolledStudent));
        }catch(error){
            console.log('UNENROLL STUDENT THUNK ERROR: ', error)
        }
    }
  }
  
  
  export const singleStudentReducer = (state = {}, action) => {
    switch (action.type) {
      case SET_STUDENT:
        console.log('CAMPUSACTION', state)
        return {...state, student: action.student};
      case UPDATE_STUDENT:
        return action.student;
      default:
        return state;
    }
  }


// export const studentsReducer = (state = {}, action) => {
//     switch (action.type) {
//         case _getStudent:
//             return { ...state, student: action.student };
//         case _updateStudent:
//             return { ...state, student: action.student};
//         case _clearStudent:
//             return { ...state, student: action.student };
//         default:
//             return state;
//     }
// }
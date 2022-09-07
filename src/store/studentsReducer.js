import axios from 'axios';

const SET_STUDENTS = "SET_STUDENTS";
const ADD_STUDENT = "ADD_STUDENT";
const DELETE_STUDENT = "DELETE_STUDENT";
const CLEAR_STUDENT = "CLEAR_STUDENT";

export const setStudents = (data) => {
    return{
      type: SET_STUDENTS,
      students: data,
    };
  };
  
  
  export const addStudent = (student) => {
    return {
      type: ADD_STUDENT,
      student,
    };
  };
  
  
  export const deleteStudent = (student) => {
    return{
      type: DELETE_STUDENT,
      student,
    };
  };

  export const clearStudent = () => {
    return{
      type: CLEAR_STUDENT,
      campus: null,
    };
  };

  export const fetchAllStudents = () => {
    return async (dispatch) => {
      try{
        const students = await axios.get('/api/students');
        dispatch(setStudents(students.data));
      }catch(error){
        console.log('FETCH STUDENT THUNK ERROR: ', error);
      }
    };
  };
  
  
  export const addNewStudent = (student) => {
    return async (dispatch) => {
      try{
        const newStudent  = await axios.post('/api/students', student)
        dispatch(addStudent(newStudent.data));
      }catch(error){
        console.log('ADD STUDENT THUNK ERROR: ', error)
      }
    };
  };
  
  
  export const deleteThisStudent = (id) => {
      
    return async (dispatch) => {
      try{
        const deletedStudent = await axios.delete(`/api/students/${id}`);
        dispatch(deleteStudent(deletedStudent.data))
      }catch(error){
        console.log('DELETE STUDENT THUNK ERROR: ', error)
      }
    };
  };
  
  
  
  export const studentsReducer = (state = [], action) => {
    switch (action.type) {
      case SET_STUDENTS:
        console.log('STUDENTSACTION', action.students);
        return action.students;
      case DELETE_STUDENT:
        return state.filter((student) => student.id !== action.student.id);
      case CLEAR_STUDENT:
        return [];
      default:
        return state;
    }
  }
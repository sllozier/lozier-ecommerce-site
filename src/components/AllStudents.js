import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllStudents, deleteThisStudent, clearStudent } from '../store/studentsReducer';
import { Link } from 'react-router-dom';
import AddStudent from './AddStudent';


const AllStudents = () => {
  const dispatch = useDispatch();
    
    
    const students = useSelector(state => state.students);
   

    useEffect(() => {
        dispatch(fetchAllStudents());
        dispatch(clearStudent());
    }, []);


  return (
    <div id='students' className='column'>
      {students
        ? students.map((student) => (
            <div className='students' key={`All Students ${student.id}`}>
              <Link to={`/students/${student.id}`}>
                <h3>Name: {student.firstName} {student.lastName}</h3>
                <h6>Email: {student.email} GPA: {student.gpa}</h6>
                <img src={student.imageUrl}/>
              </Link>
              <button onClick={() => dispatch(deleteThisStudent(student.id))}className='delete-button'>X</button>
              <hr/>
            </div>
          ))
      :null}
      <hr />
        <AddStudent />
    </div>
   )
};

export default AllStudents;
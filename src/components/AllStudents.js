import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllStudents, deleteThisStudent, clearStudent } from '../store/studentsReducer';
import { Link } from 'react-router-dom';
//import AddStudent from './AddStudent';


const AllStudents = () => {
  const dispatch = useDispatch();
    
    
    const students = useSelector(state => state.students);
    console.log('STUDENTS?', students);
    
    
    // const handleOptions = event => {
    //     setSort(event.target.value);
    // }

    useEffect(() => {
        dispatch(fetchAllStudents());
        dispatch(clearStudent());
    }, []);


  return (
    <div id='students' className='column'>
      {students
        ? students.map((student) => (
            <div className='students' key={`All Students ${student.id}`}>
                <h1>{student.id}</h1>
              <button onClick={() => dispatch(deleteThisStudent(student.id))}className='delete-button'>X</button>
              <Link to={`/students/${student.id}`}>
                <h3>{student.firstName}{student.lastName}</h3>
                <h6>{student.email}{student.gpa}</h6>
                <img src={student.imageUrl}/>
              </Link>
              <hr/>
            </div>
          ))
      :null}
      <hr />
        {/* <AddStudent /> */}
    </div>
   )
};

export default AllStudents;
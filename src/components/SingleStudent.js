import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchOneStudent, singleStudentReducer } from '../store/singleStudentReducer';
import { fetchAllStudents } from '../store/studentsReducer';
import { fetchAllCampuses } from '../store/campusesReducer';
//import { unenrollThisStudent  } from '../store/singleStudentReducer'


const SingleStudent = () => {
    const dispatch = useDispatch();
    const params = useParams();

    console.log('PARAMS?', params);
    

    const  student   = useSelector(state =>  state.student);
    const students = useSelector(state => state.students);
    const campuses = useSelector(state => state.campuses);
    const studentCampus = useSelector(state => state.student ? state.student.campusId : undefined);
    // const state = useSelector((state) => state)
     //console.log('STUDENT?', student);
     //console.log('STUDENTCAMPUS', studentCampus)
     let campusName = 'no campus';
     let campusssId = ''
    campuses.map((campus) => {
        if(campus.id === student.campusId){
            campusName = campus.name;
            campusssId = campus.id;
        }
    })
    //console.log('NAME??', campusName)
    //console.log('ID??', campusssId)


    useEffect(() => {
        if(!isNaN(params.studentId)){
            dispatch(fetchOneStudent(params.studentId));
            dispatch(fetchAllCampuses());
        }
    }, []);


    

    return (
        <div>
            { student && campuses ?
                <div key={student.id} id='single-student' className='column'>
                    <div id="single-student-details" className='row'>
                        <div className='column mr1'>
                        <img src={student.imageUrl} alt={student.imageUrl}/>
                        <h2>{student.firstName}{student.lastName}</h2>
                        <p>{student.email}</p>
                        <p>{student.gpa}</p>
                        </div>
                        <h3>Campus: {studentCampus ? <Link to={`/campuses/${studentCampus}`}>{campusName}</Link> : 'Not Enrolled'}</h3>
                        {console.log('rendering...')}
                        <hr/>
                    </div>
                </div>
                : students.findIndex(thisStudent => thisStudent.id === parseInt(params.studentId)) !== -1 ? 'Loading...': 'This student does not exist' 
            }
        </div>
      );
    };
    
    export default SingleStudent;
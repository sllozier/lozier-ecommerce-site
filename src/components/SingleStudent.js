import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchOneStudent } from '../store/singleStudentReducer';
import { fetchAllCampuses } from '../store/campusesReducer';
import EditStudent from './EditStudent';


const SingleStudent = () => {
    const dispatch = useDispatch();
    const params = useParams();
    

    const  student   = useSelector(state =>  state.student);
    const students = useSelector(state => state.students);
    const campuses = useSelector(state => state.campuses);
    const studentCampus = useSelector(state => state.student ? state.student.campusId : undefined);
    
     let campusName = 'no campus';
     let campusssId = '';
     let campusImage = '';
    campuses.map((campus) => {
        if(campus.id === student.campusId){
            campusName = campus.name;
            campusssId = campus.id;
            campusImage = campus.imageUrl
        }
    })
    


    useEffect(() => {
        if(!isNaN(params.studentId)){
            dispatch(fetchOneStudent(params.studentId));
            dispatch(fetchAllCampuses());
        }
    }, []);

    
    

    return (
        <div key={student.id} id='single-student' className='column'>
            { student && campuses ?
                <div  id='single-student-detail' className='row'>
                    <img src={`/${student.imageUrl}`}/>
                        <div className='column mr1'>
                        <h2>Name: {student.firstName} {student.lastName}</h2>
                        <p>Email: {student.email}</p>
                        <p>GPA: {student.gpa}</p>
                        <p>Quote: {`"${student.quote}"`}</p>
                        </div>
                        <div id='editStudent'>
                        <EditStudent/>
                        </div>     
                </div>
                : students.findIndex(thisStudent => thisStudent.id === parseInt(params.studentId)) !== -1 ? 'Loading...': 'This student does not exist'}
                <div id='single-student-campus'>
                <h3>Campus: {studentCampus ? <Link to={`/campuses/${studentCampus}`}>{campusName}</Link> : 'Not Enrolled in School!'}</h3>
                        <hr/>
                </div>
        </div>
      );
    };
    
    export default SingleStudent;
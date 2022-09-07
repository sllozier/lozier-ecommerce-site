import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchOneCampus, removeStudent } from '../store/singleCampusReducer';
import { fetchAllCampuses } from '../store/campusesReducer';
import { fetchAllStudents } from '../store/studentsReducer';
import { unenrollThisStudent, fetchOneStudent  } from '../store/singleStudentReducer'


const SingleCampus = () => {
    const dispatch = useDispatch();
    const params = useParams();

    //console.log('PARAMS?', campusId);
    

    const  campus   = useSelector(state =>  state.campus);
    const campuses = useSelector(state => state.campuses);
    const students = useSelector(state => state.students);
    // const isEnrollee = useSelector(state => state.student ? state.student.campusId : undefined);
    console.log('STUDENTS??', students)
    
    


    const isEnrollee = students.filter((student) =>  student.id === campus.id);
     console.log('ISENROLLEE?', isEnrollee);
    // console.log('STUDENTS?', students)
    // console.log('THISSTUDENT', thisStudent);

    // console.log('NAME??', studentName);
    // console.log('ID??', studentId);
   
    


    useEffect(() => {
        if(!isNaN(params.campusId)){
            dispatch(fetchOneCampus(params.campusId));
            dispatch(fetchAllCampuses());
            dispatch(fetchAllStudents());
        }
    }, []);


    const handleRemove = student => {
        console.log('HANDLESTUDENT', student)
        dispatch(unenrollThisStudent({campusId: null, id: student.id}));
        dispatch(removeStudent({student: {campusId: null, id:student.id}}));
    }

    

    return (
        <div>
            { campus ?
                <div key={campus.id} id='single-campus' className='column'>
                    <div id="single-campus-details" className='row'>
                        <div className='column mr1'>
                        <img src={campus.imageUrl} alt={campus.imageUrl}/>
                        <h2>{campus.name}</h2>
                        <p>{campus.address}</p>
                        <p>{campus.description}</p>
                        </div>
                        <h3>Campus Enrollees:</h3>
                        {/* <button onClick={() => handleRemove(student) }>Unregister {studentFirstName} {studentLastName}</button>
                        {console.log('rendering...')} */} 
                        { isEnrollee.length > 0 ? 
                            <ul>
                                {isEnrollee.map(enrollee => 
                            <li key={enrollee.id}>
                                <Link to={`/students/${enrollee.id}`}>{enrollee.firstName} {enrollee.lastName}</Link>  
                                    <button onClick={() => handleRemove(enrollee) }>Unregister</button>
                                </li>)}
                            </ul> 
                            : 'Not Enrolled'}
                        <hr/>
                    </div>
                </div>
                : campuses.findIndex(currCampus => currCampus.id === parseInt(params.campusId)) !== -1 ? 'Loading campus information...': 'Campus does not exist' 
            }
        </div>

    
      
            
            
        //   </div>
        //   <h3>Enrollees:</h3>
        //   <hr />
        //   {/* <StudentsList students={students} /> */}
        // </div>
      );
    };
    
    export default SingleCampus;

    // {isEnrollee ? <Link to={`/students/${studentId}`}>{studentFirstName} {studentLastName}</Link> : 'Not Enrolled'}
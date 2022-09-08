import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchOneCampus } from '../store/singleCampusReducer';
import { fetchAllCampuses } from '../store/campusesReducer';
import { fetchAllStudents } from '../store/studentsReducer';
import { unenrollThisStudent } from '../store/singleStudentReducer'
import EditCampus from './EditCampus';



const SingleCampus = () => {
    const dispatch = useDispatch();
    const params = useParams();

    
    

    const  campus   = useSelector(state =>  state.campus);
    const campuses = useSelector(state => state.campuses);
    const students = useSelector(state => state.students);
   
    


    const isEnrollee = students.filter((student) =>  student.id === campus.id);
     

    useEffect(() => {
        if(!isNaN(params.campusId)){
            dispatch(fetchOneCampus(params.campusId));
            dispatch(fetchAllCampuses());
            dispatch(fetchAllStudents());
        }
    }, []);


    const handleRemove = student => {
        dispatch(unenrollThisStudent({campusId: null, id: student.id}));
    }
 //^^^^ This is setting campusId to null in the database but I can't get the browser to update.
 //I am moving on to other areas of the project so I don't waste time here FOREVERRR...
 //I looked at creating a useState but couldn't quite get it going.    
    
    

    

    return (
        <div key={campus.id} id='single-campus' className='column'>
            
            { campus ?
                    <div id='single-campus-detail' className='row'>
                        <img src={`/${campus.imageUrl}`}/>
                        <div className='column mr1'>
                        <h2>{campus.name}</h2>
                        <p>Location: {campus.address}</p>
                        <p>Description: {campus.description}</p>
                        </div>
                        
                        <div id='editCampus'>
                        <EditCampus/>
                        </div>
                    </div>
                : campuses.findIndex(thisCampus => thisCampus.id === parseInt(params.campusId)) !== -1 ? 'Loading campus...': "Oh no! Campus doesn't exist! Check your input for typos!"}
                <div id="single-campus-students">
                        <h3>Campus Enrollees:</h3>
                        { isEnrollee.length > 0 ? 
                            <ul>
                                {isEnrollee.map(enrollee => 
                            <li key={enrollee.id}>
                                <Link to={`/students/${enrollee.id}`}>{enrollee.firstName} {enrollee.lastName}</Link>  
                                    <button onClick={() => handleRemove(enrollee) }>Unregister</button>
                                </li>)}
                            </ul> 
                            : 'No One Enrolled Yet!'}
                            </div>
                        <hr/>
        </div>
      );
    };
    
    export default SingleCampus;

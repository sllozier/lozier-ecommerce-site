import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchOneCampus} from '../store/singleCampusReducer';
import { fetchAllCampuses, removeStudent } from '../store/campusesReducer';
import { unenrollThisStudent  } from '../store/singleStudentReducer'


const SingleCampus = () => {
    const dispatch = useDispatch();
    const params = useParams();

    //console.log('PARAMS?', campusId);
    

    const  campus   = useSelector(state =>  state.campus);
    const campuses = useSelector(state => state.campuses);
    // const state = useSelector((state) => state)
     console.log('CAMPUSES?', campuses);
     console.log('CAMPUS', campus)
    
    
    //console.log('NAME?', campus.student)
   
    const handleRemove = student => {
        dispatch(unenrollThisStudent({campusId: null, id: student.id}));
        dispatch(removeStudent(student));
    }


    useEffect(() => {
        if(!isNaN(params.campusId)){
            dispatch(fetchOneCampus(params.campusId));
       dispatch(fetchAllCampuses())
        }
    }, []);


    

    return (
        <div>
            { campus ?
                <div key={campus.id} id='single-campus' className='column'>
                    <div id="single-campus-details" className='row'>
                        <div className='column mr1'>
                        <img src={campus.imageUrl} alt={campus.imageUrl}/>
                        <h2>{campus.name}</h2>
                        <p><i>{campus.address}</i></p>
                        <p>{campus.description}</p>
                        </div>
                        {/* <h3>Campus Enrollees:</h3>
                        {console.log('rendering...')}
                        {campus.students.length > 0 ? 
                            <ul>
                                {campus.students.map(student => 
                                <li key={student.id}>
                                    <Link to={`/students/${student.id}`}>
                                        {student.firstName + ' ' + student.lastName}
                                    </Link>
                                    <button onClick={() => handleRemove(student) }>Unregister {student.firstName} {student.lastName}</button>
                                </li>)}
                            </ul> 
                            : 'This campus currently has no students enrolled.' } */}
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
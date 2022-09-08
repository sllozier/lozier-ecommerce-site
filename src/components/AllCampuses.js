import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCampuses, deleteThisCampus, clearCampus } from '../store/campusesReducer';
import { Link } from 'react-router-dom';
import AddCampus from './AddCampus';


const AllCampuses = () => {
  const dispatch = useDispatch();
    
    
    const campuses = useSelector(state => state.campuses);


    useEffect(() => {
        dispatch(fetchAllCampuses());
        dispatch(clearCampus());
    }, []);


  return (
    <div id='campuses' className='column'>
      {campuses
        ? campuses.map((campus) => (
            <div className='campuses' key={`All Campuses ${campus.id}`}>
              <Link to={`/campuses/${campus.id}`}>
                <h3>{campus.name}</h3>
                <h6>Location: {campus.address}</h6>
              </Link>
              <button onClick={() => dispatch(deleteThisCampus(campus.id))}className='delete-button'>X</button>
              <hr/>
            </div>
          ))
      :null}
      <hr />
      <div className='add'>
      <AddCampus />
      </div>
        
    </div>
   )
};


export default AllCampuses;
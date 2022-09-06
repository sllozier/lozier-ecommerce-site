import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCampuses, deleteThisCampus, clearCampus } from '../store/campusesReducer';
import { Link } from 'react-router-dom';
import AddCampus from './AddCampus';


const AllCampuses = () => {
  const dispatch = useDispatch();
    
    
    const campuses = useSelector(state => state.campuses);
    
    console.log('CampusList?', campuses)
    // const handleOptions = event => {
    //     setSort(event.target.value);
    // }

    useEffect(() => {
        dispatch(fetchAllCampuses());
        dispatch(clearCampus());
    }, []);


  return (
    <div id='campuses' className='column'>
      {campuses
        ? campuses.map((campus) => (
            <div className='campuses' key={`All Campuses ${campus.id}`}>
                <h1>{campus.id}</h1>
              <button onClick={() => dispatch(deleteThisCampus(campus.id))}className='delete-button'>X</button>
              <Link to={`/campuses/${campus.id}`}>
                <h3>{campus.name}</h3>
                <h6>{campus.address}</h6>
                <img src={campus.imageUrl}/>
              </Link>
              <hr/>
            </div>
          ))
      :null}
      <hr />
        <AddCampus />
    </div>
   )
};

//   return (
//     <div id='campuses' className='column'>
//       {campuses.map((campus) => {
//           const handleDelete = (event) => {
//             event.preventDefault();
//             dispatch(deleteThisCampusAsync(campus.id))
//               }
//               return(
//                 <div className='campus-list' key={`Campus List ${campus.id}`}>
//                 <Link to={`/campuses/${campus.id}`}>
//                 <h3>{campus.name}</h3>
//                 <h6>{campus.address}</h6>
//                 <p>{campus.id}</p>
//                 </Link>
//               <div className='delete-button'>
//                 <button onClick={handleDelete}>X</button>
//               </div>
//               </div>
//               );
//             </div>
//               })}
//         <div>
//       <hr />
//         <AddCampus />
//     </div>
//   );
// };

export default AllCampuses;
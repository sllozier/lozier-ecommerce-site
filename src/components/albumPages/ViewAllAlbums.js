import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums } from '../../store/reducers/albumSlice';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';






const ViewAllAlbums = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 4;
  const allAlbums = useSelector((state) => state.album.albumList);
  // AOS.init()
  
  
  // dispatch thunk to get all albums
  useEffect(() => {
      setLoading(true);
      dispatch(fetchAlbums());
      setLoading(false);
  }, []);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allAlbums.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

 
  return (
    
    <>
      <section className='section'>
        <div className='container'>
          <h3 className='title has-text-centered is-size-4'>Albums</h3>
          <div className='columns mt-5 is-8 is-variable' >
              {currentData.map((album) => (
                <div className='column is-4-tablet is-3-desktop' key={album.id}>
                <div className='card'>
                  <div className='card-image has-text-centered px6'>
                    <img src={album.image}/>
                  </div>
                  <div className='card-content'>
                    <p className='title is-size-5'>{album.title}</p>
                    <p>${album.price}</p>
                    <p>{album.stock} in stock</p>
                  </div>
                  <footer className='card-footer'>
                    <p className='card-footer-item'>
                      <a href="" className='has-text-black'>View</a>
                    </p>
                  </footer>
                </div>
                </div>
              ))}
          </div>
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={allAlbums.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}/>
      </section>    
    </>
  );
}
export default ViewAllAlbums;

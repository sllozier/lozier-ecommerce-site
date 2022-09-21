import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbumsThunk } from '../../store/reducers2/albumReducer';
import { Link } from 'react-router-dom';
function AllAlbums() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const allAlbums = useSelector((state) => state.albums.albums);

  // dispatch thunk to get all albums
  useEffect(() => {
    dispatch(setAlbumsThunk());
  }, [dispatch]);

  // check if data has loaded
  useEffect(() => {
    if (allAlbums.length > 0) {
      setLoading(false);
    }
  }, [allAlbums]);
  
  return loading ? (
    <div>Albums loading...</div>
  ) : (
    <>
      {allAlbums.map((album) => (
        <div key={album.id}>
          <Link to={'/products/' + album.id}>
          <div style={{ marginTop: '5em' }}>{album.title}</div>
          <img
            className="albumArt"
            src={album.image}
            alt=""
            style={{ height: '200px' }}
          />
          {/* TODO: move all styling to css file */}
          <div>${album.price}</div>
          <div>{album.stock} left in store</div>
          </Link>
        </div>
      ))}
    </>
  );
}
export default AllAlbums;

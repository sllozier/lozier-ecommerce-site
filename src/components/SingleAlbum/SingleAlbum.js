import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbumThunk } from '../../store/reducers2/albumReducer';
import { useParams } from 'react-router-dom';

function SingleAlbum() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const album = useSelector((state) => state.albums.album);

  useEffect(() => {
    dispatch(setAlbumThunk(id));
  }, [dispatch]);

  useEffect(() => {
    if (album) {
      setLoading(false);
    }
  }, [album]);

  return loading ? (
    <div>Loading Album...</div>
  ) : (
    <div className='single-album-container'>
      <div>
        <img src={album.image} alt="" style={{ height: '500px' }} />
      </div>

      {/* TODO: move all styling to css file */}
      <div>
        <h2>{album.title}</h2>
        <h2>${album.price}</h2>
        <h4>{album.stock} left in store</h4>
        <p>{album.description}</p>
        <button>Add to Cart</button>
      </div>

    </div>
  );
}

export default SingleAlbum;
